import {
  last,
  first,
  string,
  pattern,
  email,
  url,
  ip,
  ipv4,
  ipv6,
  alpha,
  alphaNum,
  bool,
  num,
  domain,
  host
} from "../rules/string";

// String rule tests

describe("Validate String rule", () => {
  const values = {
    valid: ["this is string", "l"],
    invalid: [22, { a: "l" }, true, ["string"]]
  };

  const rule = string;

  values.valid.forEach(v => {
    it(`value : ${v} should be true`, () => {
      expect(rule(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`value : ${v} should be false`, () => {
      expect(rule(v)).toBe(false);
    });
  });
});

// first rule tests
describe("Validate First rule with value abc", () => {
  const values = {
    valid: ["abcd", "abcli"],
    invalid: ["ablr", "abli", "ali"]
  };

  const rule = v => first("abc", v);

  values.valid.forEach(v => {
    it(`value : ${v} should be true`, () => {
      expect(rule(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`value : ${v} should be false`, () => {
      expect(rule(v)).toBe(false);
    });
  });
});

describe("Validate Last rule with value rr", () => {
  const values = {
    valid: ["holarr", "toktarr"],
    invalid: ["ablxr", "abli", "ali"]
  };

  const rule = v => last("rr", v);

  values.valid.forEach(v => {
    it(`value : ${v} should be true`, () => {
      expect(rule(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`value : ${v} should be false`, () => {
      expect(rule(v)).toBe(false);
    });
  });
});

describe("Validate rule Pattern with value /^abc$/i", () => {
  const values = {
    valid: ["abc"],
    invalid: ["abcr", "abr"]
  };

  const rule = v => pattern(/^abc$/i, v);

  values.valid.forEach(v => {
    it(`value : ${v} should be true`, () => {
      expect(rule(v)).toBe(true);
    });
  });
  values.invalid.forEach(v => {
    it(`value : ${v} should be false`, () => {
      expect(rule(v)).toBe(false);
    });
  });
});

describe("Validate validate email rule", () => {
  const emails = {
    valid: [
      "foo@bar.com",
      "foo@bar.com.au",
      "foo+bar@bar.com",
      "hans.m端ller@test.com",
      "test123+ext@gmail.com",
      "some.name.midd.leNa.me+extension@GoogleMail.com",
      "test@gmail.com",
      "test.1@gmail.com"
    ],
    invalid: [
      "invalidemail@",
      "invalid.com",
      "@invalid.com",
      "foo@bar.com.",
      "somename@ｇｍａｉｌ.com",
      "foo@bar.co.uk.",
      "z@co.c",
      "ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com",
      "test1@invalid.co m",
      "test2@invalid.co m",
      "test3@invalid.co m",
      "test4@invalid.co m",
      "test5@invalid.co m",
      "test6@invalid.co m",
      "test7@invalid.co m",
      "test8@invalid.co m",
      "test9@invalid.co m",
      "test10@invalid.co m",
      "test11@invalid.co m",
      "test12@invalid.co m",
      "test13@invalid.co m",
      "multiple..dots@stillinvalid.com",
      "test123+invalid! sub_address@gmail.com",
      "gmail...ignores...dots...@gmail.com",
      "ends.with.dot.@gmail.com",
      "multiple..dots@gmail.com",
      'wrong()[]",:;<>@@gmail.com',
      '"wrong()[]",:;<>@@gmail.com'
    ]
  };
  emails.valid.forEach(validEmail => {
    it(`Value : ${validEmail} should be true`, () => {
      expect(email(validEmail)).toBe(true);
    });
  });
  emails.invalid.forEach(inValid => {
    it(`Value : ${inValid} should be false`, () => {
      expect(email(inValid)).toBe(false);
    });
  });
});

describe("Validate validate url rule", () => {
  const urls = {
    valid: [
      "http://www.foobar.com/",
      "HTTP://WWW.FOOBAR.COM/",
      "https://www.foobar.com/",
      "HTTPS://WWW.FOOBAR.COM/",
      "http://www.foobar.com:23/",
      "http://www.foobar.com:65535/",
      "https://www.foobar.com/",
      "ftp://www.foobar.com/",
      "http://www.foobar.com/~foobar",
      "http://user:pass@www.foobar.com/",
      "http://user:@www.foobar.com/",
      "http://189.123.14.13/",
      "http://duckduckgo.com/?q=%2F",
      "http://foobar.com/t$-_.+!*'(),",
      "http://foobar.com/?foo=bar#baz=qux",
      "http://foobar.com?foo=bar",
      "http://foobar.com#baz=qux",
      "http://www.xn--froschgrn-x9a.net/",
      "http://xn--froschgrn-x9a.com/",
      "http://foo--bar.com",
      "http://høyfjellet.no"
    ],
    invalid: [
      "http://localhost:3000/",
      "//foobar.com",
      "xyz://foobar.com",
      "invalid/",
      "invalid.x",
      "invalid.",
      ".com",
      "http://com/",
      "http://300.0.0.1/",
      "mailto:foo@bar.com",
      "rtmp://foobar.com",
      "http://www.xn--.com/",
      "http://xn--.com/",
      "http://www.foobar.com:0/",
      "http://www.-foobar.com/",
      "http://www.foobar-.com/",
      "http://foobar/# lol",
      "http://foobar/? lol",
      "http://foobar/ lol/",
      "http://lol @foobar.com/",
      "http://lol:lol @foobar.com/",
      "http://lol: @foobar.com/",
      "http://www.foobar.com/\t",
      "http://\n@www.foobar.com/",
      "",
      "http://*.foo.com",
      "*.foo.com",
      "!.foo.com",
      "http://localhost:61500this is an invalid url!!!!",
      "////foobar.com",
      "http:////foobar.com"
    ]
  };
  urls.valid.forEach(valid => {
    it(`Value ${valid} true`, () => {
      expect(url(valid)).toBe(true);
    });
  });
  urls.invalid.forEach(inValid => {
    it(`Value ${inValid} false`, () => {
      expect(url(inValid)).toBe(false);
    });
  });
});

describe("Validate ipv4 Rule", () => {
  const ips = {
    valid: ["127.0.0.1", "0.0.0.0", "1.2.3.4"],
    invalid: [
      "abc",
      "256.0.0.0",
      "0.0.0.256",
      "26.0.0.256",
      "0200.200.200.200",
      "200.0200.200.200",
      "200.200.0200.200",
      "200.200.200.0200"
    ]
  };
  ips.valid.forEach(valid => {
    it(`value : ${valid} , should be true`, () => {
      expect(ipv4(valid)).toBe(true);
    });
  });
  ips.invalid.forEach(inValid => {
    it(`value: ${inValid} , should be false`, () => {
      expect(ipv4(inValid)).toBe(false);
    });
  });
});

describe("Validate ipv6 Rule", () => {
  const ips = {
    valid: [
      "::1",
      "2001:db8:0000:1:1:1:1:1",
      "2001:41d0:2:a141::1",
      "::ffff:127.0.0.1",
      "::0000",
      "0000::",
      "1::",
      "1111:1:1:1:1:1:1:1",
      "fe80::a6db:30ff:fe98:e946",
      "::",
      "::ffff:127.0.0.1",
      "0:0:0:0:0:ffff:127.0.0.1"
    ],
    invalid: [
      "::banana",
      "banana::",
      "::1banana",
      "1:",
      ":1",
      "1:1:1:1:1:1:1:1:1:1:1:1:1:1:1:1",
      "::11111",
      "11111:1:1:1:1:1:1:1",
      "2001:db8:0000:1:1:1:1::1",
      "0:0:0:0:0:0:ffff:127.0.0.1",
      "0:0:0:0:ffff:127.0.0.1"
    ]
  };
  ips.valid.forEach(valid => {
    it(`value : ${valid} , should be true`, () => {
      expect(ipv6(valid)).toBe(true);
    });
  });
  ips.invalid.forEach(inValid => {
    it(`value: ${inValid} , should be false`, () => {
      expect(ipv6(inValid)).toBe(false);
    });
  });
});

describe("Validate rule ip", () => {
  const ips = {
    valid: [
      "127.0.0.1",
      "1.2.3.4",
      "1::",
      "1111:1:1:1:1:1:1:1",
      "fe80::a6db:30ff:fe98:e946",
      "0:0:0:0:0:ffff:127.0.0.1"
    ],
    invalid: [
      "::banana",
      "banana::",
      "::1banana",
      "1:",
      ":1",
      "200.0200.200.200",
      "200.200.0200.200",
      "200.200.200.0200"
    ]
  };
  ips.valid.forEach(valid => {
    it(`value : ${valid} , should be true`, () => {
      expect(ip(valid)).toBe(true);
    });
  });
  ips.invalid.forEach(inValid => {
    it(`value: ${inValid} , should be false`, () => {
      expect(ip(inValid)).toBe(false);
    });
  });
});

describe("Validate alpha rule", () => {
  const strings = {
    valid: ["abc", "ABC", "FoObar"],
    invalid: ["abc1", "  foo  ", "", "ÄBC", "FÜübar", "Jön", "Heiß"]
  };
  strings.valid.forEach(valid => {
    it(`value : ${valid} , should be true`, () => {
      expect(alpha(valid)).toBe(true);
    });
  });
  strings.invalid.forEach(inValid => {
    it(`value: ${inValid} , should be false`, () => {
      expect(alpha(inValid)).toBe(false);
    });
  });
});
describe("Validate alphaNum rule", () => {
  const strings = {
    valid: ["abc123", "ABC11"],
    invalid: ["abc ", "foo!!", "ÄBC", "FÜübar", "Jön"]
  };
  strings.valid.forEach(valid => {
    it(`value : ${valid} , should be true`, () => {
      expect(alphaNum(valid)).toBe(true);
    });
  });
  strings.invalid.forEach(inValid => {
    it(`value: ${inValid} , should be false`, () => {
      expect(alphaNum(inValid)).toBe(false);
    });
  });
});

describe("Validate bool Rule", () => {
  const strings = {
    valid: ["true", "false", "True", "False", "TRUE", "FALSE", "FaLse", "TRue"],
    invalid: ["truee", "fallse", "Fals e"]
  };
  strings.valid.forEach(valid => {
    it(`value : ${valid} , should be true`, () => {
      expect(bool(valid)).toBe(true);
    });
  });
  strings.invalid.forEach(inValid => {
    it(`value:  ${inValid} , should be false`, () => {
      expect(bool(inValid)).toBe(false);
    });
  });
});

describe("Validate num Rule", () => {
  const strings = {
    valid: ["34", "44", "98", "9.3", "34", "99", "6.344", "-0.33", "+33"],
    invalid: ["0..34", "f0.03", "l", "++333"]
  };
  strings.valid.forEach(valid => {
    it(`value : ${valid} , should be true`, () => {
      expect(num(valid)).toBe(true);
    });
  });
  strings.invalid.forEach(inValid => {
    it(`value: ${inValid} , should be false`, () => {
      expect(num(inValid)).toBe(false);
    });
  });
});

describe("Validate Domain rule", () => {
  const ips = {
    valid: [
      "domain.com",
      "dom.plato",
      "a.domain.co",
      "foo--bar.com",
      "xn--froschgrn-x9a.com",
      "rebecca.blackfriday"
    ],
    invalid: [
      "abc",
      "256.0.0.0",
      "_.com",
      "*.some.com",
      "s!ome.com",
      "domain.com/",
      "/more.com"
    ]
  };
  ips.valid.forEach(valid => {
    it(`value : ${valid} , should be true`, () => {
      expect(domain(valid)).toBe(true);
    });
  });
  ips.invalid.forEach(inValid => {
    it(`value: ${inValid} , should be false`, () => {
      expect(domain(inValid)).toBe(false);
    });
  });
});

describe("Validate Host rule", () => {
  const ips = {
    valid: [
      "domain.com",
      "dom.plato",
      "a.domain.co",
      "127.0.0.1",
      "1.2.3.4",
      "1::",
      "1111:1:1:1:1:1:1:1",
      "fe80::a6db:30ff:fe98:e946",
      "0:0:0:0:0:ffff:127.0.0.1"
    ],
    invalid: ["abc", "256.0.0.0", "_.com", "1:", ":1", "200.0200.200.200"]
  };
  ips.valid.forEach(valid => {
    it(`value : ${valid} , should be true`, () => {
      expect(host(valid)).toBe(true);
    });
  });
  ips.invalid.forEach(inValid => {
    it(`value: ${inValid} , should be false`, () => {
      expect(host(inValid)).toBe(false);
    });
  });
});
