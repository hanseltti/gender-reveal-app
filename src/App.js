import React, { useState, useEffect, useRef } from "react";
import { FaBaby, FaFacebookF, FaTwitter, FaWhatsapp, FaReddit, FaLink } from "react-icons/fa";

export default function App() {
  const [motherYear, setMotherYear] = useState("");
  const [fatherYear, setFatherYear] = useState("");
  const [conceptionYear, setConceptionYear] = useState("");
  const [predictionMessage, setPredictionMessage] = useState("");
  const [resultBoxClass, setResultBoxClass] = useState("");
  const resultRef = useRef(null);

  // helper functions (mirror the fixed JS logic)
  function getMotherFinal(mY, cY) {
    let y = mY;
    while (y + 3 <= cY) { y += 3; }
    return y;
  }
  function getFatherFinal(fY, cY) {
    let y = fY;
    while (y + 4 <= cY) { y += 4; }
    return y;
  }

  function calculate() {
    const m = parseInt(motherYear, 10);
    const f = parseInt(fatherYear, 10);
    const c = parseInt(conceptionYear, 10);

    if (!m || !f || !c) {
      alert("Please fill out all fields.");
      return;
    }

    const mFinal = getMotherFinal(m, c);
    const fFinal = getFatherFinal(f, c);

    const distM = Math.abs(c - mFinal);
    const distF = Math.abs(c - fFinal);

    let message = "";
    let cssClass = "alert-info";

    if (distM < distF) {
      message = "GIRL 💖";
      cssClass = "alert-success";
      setPredictionMessage("Our baby prediction says GIRL! 💖");
    } else if (distF < distM) {
      message = "BOY 💙";
      cssClass = "alert-info";
      setPredictionMessage("Our baby prediction says BOY! 💙");
    } else {
      message = "50/50 💖 💙 The prediction result happen when both parents have the same final year power, both change at the same time!";
      cssClass = "alert-warning";
      setPredictionMessage("The prediction result is 50/50 this happen when both parents have the same final year power, both change at the same time! 💖 💙");
    }

    // update result box
    setResultBoxClass(cssClass);
    // small trick to restart animation: remove and add 'show' class
    const el = resultRef.current;
    if (el) {
      el.classList.remove("show");
      // set content then re-add
      setTimeout(() => {
        el.innerHTML = `<i class="icon-big">${renderIcon(message)}</i><br>${message}`;
        el.classList.add("show");
      }, 50);
    }
  }

  // small helper to render icon markup string for insertion
  function renderIcon(message) {
    if (message.includes("GIRL")) {
      return `👧`;
    } else if (message.includes("BOY")) {
      return `👶`;
    } else {
      return `👧 👶`;
    }
  }

  // Social share functions use the global predictionMessage
  function shareFB() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(predictionMessage);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, "_blank");
  }
  function shareTwitter() {
    const text = encodeURIComponent(predictionMessage);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  }
  function shareWhatsApp() {
    const text = encodeURIComponent(predictionMessage + " " + window.location.href);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }
  function shareReddit() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(predictionMessage);
    window.open(`https://www.reddit.com/submit?url=${url}&title=${title}`, "_blank");
  }
  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
  }

  // ensure result box content is cleared when inputs change (so re-calc always shows new result)
  useEffect(() => {
    const el = resultRef.current;
    if (el) {
      el.classList.remove("show");
      el.innerHTML = "";
      setPredictionMessage("");
    }
  }, [motherYear, fatherYear, conceptionYear]);

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{minHeight: "100vh", padding: "20px"}}>
      <div className="col-md-6">
        <div className="card p-4">
          <h2 className="text-center mb-4 fw-bold text-primary">Baby Gender Predictor Pro 👶✨</h2>

          <div className="mb-3">
            <label className="form-label">Mother's Birth Year:</label>
            <input type="number" className="form-control" placeholder="1989" value={motherYear} onChange={e => setMotherYear(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Father's Birth Year:</label>
            <input type="number" className="form-control" placeholder="1987" value={fatherYear} onChange={e => setFatherYear(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Conception Year:</label>
            <input type="number" className="form-control" placeholder="2025" value={conceptionYear} onChange={e => setConceptionYear(e.target.value)} />
          </div>

          <button onClick={calculate} className="btn btn-primary w-100 fw-bold py-2">
            <i className="fa-solid fa-calculator"></i> Calculate Gender
          </button>

          <div ref={resultRef} id="resultBox" className={`alert mt-4 text-center fw-bold fs-4 ${resultBoxClass}`} style={{minHeight: "110px"}} />

          <div id="shareSection" className="text-center mt-3" style={{display: predictionMessage ? "block" : "none"}}>
            <h5 className="fw-bold">Share Your Prediction</h5>
            <div className="d-flex justify-content-center gap-2 mt-2">
              <button className="share-btn bg-primary text-white" onClick={shareFB}><FaFacebookF/></button>
              <button className="share-btn bg-dark text-white" onClick={shareTwitter}><FaTwitter/></button>
              <button className="share-btn bg-success text-white" onClick={shareWhatsApp}><FaWhatsapp/></button>
              <button className="share-btn" style={{background: "#FF4500", color: "white"}} onClick={shareReddit}><FaReddit/></button>
              <button className="share-btn bg-secondary text-white" onClick={copyLink}><FaLink/></button>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-500 text-xs">Built with React • Bootstrap 5
          <p>Made with 💖 by Hansel</p>
          <p className="small">⚠️ Disclaimer: This application does not offer medical advice and makes no guarantees regarding gender prediction accuracy. All results are for entertainment only.</p>
        </div>
      </div>
    </div>
  );
}
