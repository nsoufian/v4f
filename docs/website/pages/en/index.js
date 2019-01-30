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

class Button extends React.Component {
  render() {
    return (
      <div>
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

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

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = props => (
      <h3 className="projectTitle">
        <img src={props.img_src} alt="Project Logo" />
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
        <a className="button" href={props.href} target={props.target}>
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
            <Button href={docUrl("introduction/getting-started", language)}>
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
              "V4f helps your write clean validation code that other developers can " +
              "read and understand, and easy to test.",
            image: `${baseUrl}img/clean.svg`,
            imageAlign: "top",
            title: "Clean code"
          },
          {
            content:
              "All validators, algorithms, and APIs are tested carefully with +500 " +
              "unit tests.",
            image: `${baseUrl}img/test.svg`,
            imageAlign: "top",
            title: "Well tested"
          },
          {
            content:
              "V4f provide a lot of rules that you can use to build complex validation" +
              " without the need to code functions or 'if else' statement.",
            image: `${baseUrl}img/flexible.svg`,
            imageAlign: "top",
            title: "Flexible"
          },
          {
            content:
              "V4f is designed to encourage developers to build complex validator" +
              " by nesting simple validator together and export them." ,
            image: `${baseUrl}img/modules.svg`,
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
