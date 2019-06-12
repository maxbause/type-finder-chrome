import * as React from "react";
import withPackageResolver, { ISearchResult, PackageState } from "../../container/PackageResolverContainer";
import "./code-box.scss";

class CodeBoxComponent extends React.Component<ISearchResult> {
  public render() {
    const codeClasses = ["code-box__code", "code-box__code--loading"];
    const infoClasses = ["code-box__info", "code-box__info--loading"];
    if (this.props.packageState !== PackageState.LOADING) {
      codeClasses.pop();
      infoClasses.pop();
    }

    return(
      <div className="code-box">
        <div className={codeClasses.join(" ")}>
          {this.codeBoxText()}
          {this.props.packageState === PackageState.FOUND ?
            <div className="code-box__copy" onClick={this.copy.bind(this)}>📋</div>
            :
            null
          }
        </div>
        <div className={infoClasses.join(" ")}>
          {this.props.packageState === PackageState.FOUND ?
            <span>{this.props.latestVersion} • {this.props.license}</span>
            :
            null
          }
        </div>
      </div>
    );
  }

  private codeBoxText() {
    switch(this.props.packageState) {
      case PackageState.INCLUDED: {
        return <span className="code-box__code--italic">This package already includes a type definition.</span>
      }
      case PackageState.FOUND: {
        return (
          <div>
            <div>yarn add -D <span className="code-box__code--bold">{this.props.packageName}</span></div>
            <input id="code-copy" type="input" value={`yarn add -D ${this.props.packageName}`} readOnly={true} style={{position: "fixed", top: "-200vh", left: "-200vw"}} />
          </div>
        );
      }
      case PackageState.FAILED: {
        return <span className="code-box__code--italic">No type found.</span>;
      }
      default: {
        return "";
      }
    }
  }

  private copy() {
    const elementToCopy = document.getElementById("code-copy") as HTMLInputElement;
    elementToCopy.select();
    document.execCommand("copy");
  }
}

export default withPackageResolver(CodeBoxComponent);