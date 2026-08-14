import React from "react";
import "./Footer.css";

const Footer = () => {
  const cols = [
    {
      heading: "Get to Know Us",
      links: ["About Amazon", "Careers", "Press Releases", "Amazon Science"],
    },
    {
      heading: "Connect with Us",
      links: ["Facebook", "Twitter", "Instagram"],
    },
    {
      heading: "Make Money with Us",
      links: [
        "Sell on Amazon",
        "Sell under Amazon Accelerator",
        "Amazon Associates",
        "Fulfilment by Amazon",
        "Advertise Your Products",
      ],
    },
    {
      heading: "Let Us Help You",
      links: [
        "COVID-19 and Amazon",
        "Your Account",
        "Returns Centre",
        "100% Purchase Protection",
        "Amazon App Download",
        "Help",
      ],
    },
  ];

  return (
    <footer className="footer">
      {/* Back to top */}
      <button
        className="footer__top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </button>

      {/* Links */}
      <div className="footer__main">
        {cols.map((col) => (
          <div key={col.heading} className="footer__col">
            <h3 className="footer__col-heading">{col.heading}</h3>
            <ul className="footer__col-links">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="footer__link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer__divider" />

      {/* Bottom */}
      <div className="footer__bottom">
        <div className="footer__logo">
          <span className="footer__logo-text">amazon</span>
          <span className="footer__logo-dot">.in</span>
        </div>

        <div className="footer__meta">
          {[
            "Conditions of Use & Sale",
            "Privacy Notice",
            "Interest-Based Ads",
          ].map((item) => (
            <a key={item} href="#" className="footer__meta-link">
              {item}
            </a>
          ))}
        </div>

        <p className="footer__copy">© 1996–2026, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default Footer;
