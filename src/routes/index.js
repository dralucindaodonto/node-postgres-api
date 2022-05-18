const express = require("express");

const router = express.Router();

router.get("/api", (req, res) => {
  const signer = require("node-signpdf").default;
  const fs = require("fs");
  const { plainAddPlaceholder } = require("node-signpdf/dist/helpers");

  const pdfSignedPath = `./signed.pdf`;
  const pdfBuffer = fs.readFileSync(`./source.pdf`);
  const certBuffer = fs.readFileSync(`./certificate.p12`);

  let inputBuffer = plainAddPlaceholder({
    pdfBuffer,
    reason: "Signed Certificate.",
    contactInfo: "sign@example.com",
    name: "Example",
    location: "Jakarta",
    signatureLength: certBuffer.length,
  });

  const signedPdf = signer.sign(inputBuffer, certBuffer, {
    asn1StrictParsing: true,
  });

  fs.writeFileSync(pdfSignedPath, signedPdf);

  res.status(200).send({
    success: true,
    message: "Tudo funcionando",
    version: "1.0.0",
  });
});

module.exports = router;
