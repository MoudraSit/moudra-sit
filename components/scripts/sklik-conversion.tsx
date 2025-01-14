import Script from "next/script";

function SklikConversion() {
  const customScript = ` 
  window.sznIVA.IS.updateIdentities({
    eid: null
  });

  var conversionConf = {
    id: 100210649,
    value: null,
    consent: 0
  };
  window.rc.conversionHit(conversionConf);`;
  return (
    <>
      <Script
        type="text/javascript"
        src="https://c.seznam.cz/js/rc.js"
        strategy="lazyOnload"
      ></Script>
      <Script id="sklik-conversion" strategy="lazyOnload">
        {customScript}
      </Script>
    </>
  );
}

export default SklikConversion;
