import Script from "next/script";

function SklikRtg() {
  const customScript = ` 
  window.sznIVA.IS.updateIdentities({
    eid: null
  });

  var conversionConf = {
    id: 100210649,
    value: null,
    consent: null
  };
  window.rc.conversionHit(conversionConf);`;
  return (
    <>
      <Script type="text/javascript" src="https://c.seznam.cz/js/rc.js"></Script>
      <Script id="sklik-rtg">{customScript}</Script>
    </>
  );
}

export default SklikRtg;
