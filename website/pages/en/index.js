/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = props => (
      <h3 className="projectTitle">
        <img src={props.img_src} width="200px" alt="Project Logo" />
        <h3>{siteConfig.tagline}</h3>
      </h3>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button btnMain" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle
            siteConfig={siteConfig}
            img_src={`${baseUrl}img/logo.png`}
          />
          <PromoSection>
            <Button href={docUrl("introduction/get-started", language)}>
              Get Started
            </Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    const Block = props => (
      <Container
        padding={["bottom", "top"]}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Features = () => (
      <Block layout="fourColumn" background="light">
        {[
          {
            content:
              "V4f helps your write clean validation code that other developers can read and understand, and easy to test.",
            image: `${baseUrl}img/clean.png`,
            imageAlign: "top",
            title: "Clean code"
          },
          {
            content:
              "All validator rules, algorithms, and APIs are tested carefully with +500 unit tests.",
            image: `${baseUrl}img/test.png`,
            imageAlign: "top",
            title: "Well tested"
          },
          {
            content:
              "V4f provide a lot of rules that you can use to build complex validation without the need to be a javascript expert.",
            image: `${baseUrl}img/flex.png`,
            imageAlign: "top",
            title: "Flexible"
          },
          {
            content:
              "V4f is designed to encourage developers to create complex validator by nesting simple validator together.",
            image: `${baseUrl}img/module.png`,
            imageAlign: "top",
            title: "Modular"
          }
        ]}
      </Block>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
        </div>
      </div>
    );
  }
}

module.exports = Index;
