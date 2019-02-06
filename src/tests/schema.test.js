import { Schema, Field } from "../index";

const json = JSON.stringify;

describe("Validate Schema, Field a string should equals abc ,and b boolean both required", () => {
  const values = {
    valid: [
      [{ a: "abc", b: true }, {}, true],
      [{ a: "abc", b: true }, { verbose: true }, null],
      [
        { a: "abc", b: true },
        { verbose: true, bool: true },
        { a: true, b: true }
      ]
    ],
    invalid: [
      [{ a: "abc" }, {}, false],
      [{ a: "bad", b: true }, {}, false],
      [undefined, {}, false],
      [{}, {}, false],
      [{ a: [], b: 2 }, {}, false],
      [{ a: "abc" }, { verbose: true }, { b: "required" }],
      [{ a: "bad", b: true }, { verbose: true }, { a: "equals" }],
      [{}, { verbose: true }, { a: "required", b: "required" }],
      [{ a: [2], b: 2 }, { verbose: true }, { a: "string", b: "boolean" }],
      [{ a: "abc" }, { verbose: true, bool: true }, { b: false, a: true }],
      [
        { a: "bad", b: true },
        { verbose: true, bool: true },
        { a: false, b: true }
      ],
      [{}, { verbose: true, bool: true }, { a: false, b: false }],
      [undefined, { verbose: true, bool: true }, { a: false, b: false }],
      [{ a: [], b: 2 }, { verbose: true, bool: true }, { a: false, b: false }]
    ]
  };

  const rule = (v, options) =>
    Schema(
      {
        a: Field()
          .string()
          .equals("abc")
          .required(),
        b: Field()
          .boolean()
          .required()
      },
      options
    ).validate(v);

  [...values.valid, ...values.invalid].forEach(([data, options, result]) => {
    it(`Run validate with Data : ${json(data)}  ||  Options: ${json(
      options
    )} || Should return ${json(result)}`, () => {
      expect(rule(data, options)).toEqual(result);
    });
  });

  describe("Same Validation With Async Options", () => {
    values.valid.forEach(([data, options]) => {
      it(`Run validate with Data : ${json(data)}  ||  Options: ${json({
        async: true,
        ...options
      })} || Should be resolved`, () =>
        rule(data, { async: true, ...options }).then(result =>
          expect(data).toEqual(result)
        ));
    });
    values.invalid.forEach(([data, options, result]) => {
      it(`Run validate with Data : ${json(data)}  ||  Options: ${json({
        async: true,
        ...options
      })} || Should be Rejected`, () => {
        expect.assertions(1);
        return rule(data, { async: true, ...options }).catch(errors =>
          expect(errors).toEqual(result === false ? undefined : result)
        );
      });
    });
  });
});

describe("One Field Validation, with Field a string should equals abc", () => {
  const values = {
    // TODO Fix One field validation in verbose options true
    valid: [["abc", {}, true], ["abc", { verbose: true }, true]],
    invalid: [
      ["bad", {}, false],
      ["bad", { verbose: true }, "equals"],
      [{ a: "bad", b: true }, { verbose: true }, "string"],
      [undefined, { verbose: true }, "required"]
    ]
  };
  const rule = (v, options) =>
    Schema({
      a: Field()
        .string()
        .equals("abc")
        .required(),
      b: Field()
        .boolean()
        .required()
    }).a.validate(v, options);

  [...values.valid, ...values.invalid].forEach(([data, options, result]) => {
    it(`Run validate with Data : ${json(data)}  ||  Options: ${json(
      options
    )} || Should return ${json(result)}`, () => {
      expect(rule(data, options)).toEqual(result);
    });
  });
});

describe("Validate Nested Schema and Related field with callback, with Field a boolean should be inverse of b.x", () => {
  const values = {
    valid: [
      [{ a: true, b: { x: false } }, {}, true],
      [{ a: false, b: { x: true } }, { verbose: true }, null],
      [
        { a: false, b: { x: true } },
        { verbose: true, bool: true },
        { a: true, b: { x: true } }
      ]
    ],
    invalid: [
      [{ a: false, b: { x: false } }, {}, false],
      [{}, {}, false],
      [{ a: true, b: { x: true } }, { verbose: true }, { a: "equals" }],
      [
        { a: true, b: { x: true } },
        { verbose: true, bool: true },
        { a: false, b: { x: true } }
      ],
      [{}, { verbose: true, bool: true }, { a: false, b: { x: false } }]
    ]
  };
  const rule = (data, options) =>
    Schema(
      {
        a: Field()
          .boolean()
          .equals(["#b.x", value => !value])
          .required(),
        b: Schema({
          x: Field()
            .boolean()
            .required()
        })
      },
      options
    ).validate(data);

  [...values.valid, ...values.invalid].forEach(([data, options, result]) => {
    it(`Run validate with Data : ${json(data)}  ||  Options: ${json(
      options
    )} || Should return ${json(result)}`, () => {
      expect(rule(data, options)).toEqual(result);
    });
  });
  describe("Same Validation With Async Options", () => {
    values.valid.forEach(([data, options]) => {
      it(`Run validate with Data : ${json(data)}  ||  Options: ${json({
        async: true,
        ...options
      })} || Should be resolved`, () =>
        rule(data, { async: true, ...options }).then(result =>
          expect(data).toEqual(result)
        ));
    });
    values.invalid.forEach(([data, options, result]) => {
      it(`Run validate with Data : ${json(data)}  ||  Options: ${json({
        async: true,
        ...options
      })} || Should be Rejected`, () => {
        expect.assertions(1);
        return rule(data, { async: true, ...options }).catch(errors =>
          expect(errors).toEqual(result === false ? undefined : result)
        );
      });
    });
  });
});

describe("Validate Nested Schema and Related field, with Field a boolean should equals to c", () => {
  const values = {
    valid: [
      [{ a: true, b: { x: false }, c: true }, {}, true],
      [{ a: false, b: { x: true }, c: false }, { verbose: true }, null],
      [
        { a: true, b: { x: true }, c: true },
        { verbose: true, bool: true },
        { a: true, b: { x: true }, c: true }
      ]
    ],
    invalid: [
      [{ a: false, b: { x: false }, c: true }, {}, false],
      [
        {},
        { verbose: true },
        { a: "required", b: { x: "required" }, c: "required" }
      ],
      [
        { a: true, b: { x: true }, c: false },
        { verbose: true },
        { a: "equals" }
      ],
      [
        { a: true, c: true },
        { verbose: true, bool: true },
        { a: true, b: { x: false }, c: true }
      ],
      [
        {},
        { verbose: true, bool: true },
        { a: false, b: { x: false }, c: false }
      ],
      [
        undefined,
        { verbose: true, bool: true },
        { a: false, b: { x: false }, c: false }
      ]
    ]
  };
  const rule = (data, options) =>
    Schema(
      {
        a: Field()
          .boolean()
          .equals(["#c"])
          .required(),
        c: Field()
          .boolean()
          .required(),
        b: Schema(
          {
            x: Field()
              .boolean()
              .required()
          },
          { async: true, verbose: true }
        )
      },
      options
    ).validate(data);

  [...values.valid, ...values.invalid].forEach(([data, options, result]) => {
    it(`Run validate with Data : ${json(data)}  ||  Options: ${json(
      options
    )} || Should return ${json(result)}`, () => {
      expect(rule(data, options)).toEqual(result);
    });
  });
  describe("Same Validation With Async Options", () => {
    values.valid.forEach(([data, options]) => {
      it(`Run validate with Data : ${json(data)}  ||  Options: ${json({
        async: true,
        ...options
      })} || Should be resolved`, () =>
        rule(data, { async: true, ...options }).then(result =>
          expect(data).toEqual(result)
        ));
    });
    values.invalid.forEach(([data, options, result]) => {
      it(`Run validate with Data : ${json(data)}  ||  Options: ${json({
        async: true,
        ...options
      })} || Should be Rejected`, () => {
        expect.assertions(1);
        return rule(data, { async: true, ...options }).catch(errors =>
          expect(errors).toEqual(result === false ? undefined : result)
        );
      });
    });
  });
});
