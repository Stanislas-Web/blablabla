import React from "react";
import "assets/css/TheFooter.scss";

export default function TheFooter() {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <span className="text-muted" style={{fontWeight:"300"}}>
            © 2020 Cartographie VBG RDC
            </span>
          </div>
          <div className="col-sm-6">
          <span className="footerNone" style={{color:"#fff"}}>
              Powered by Kinshasa Digital Academy
            </span>
            <span className="text-muted " style={{fontWeight:"300"}}>
              Powered by <a className="text-muted" href="https://www.kinshasadigital.com/academy" target="target">Kinshasa Digital Academy</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
