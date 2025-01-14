import Script from "next/script";

function SklikRtg() {
  const customScript = ` 
  window.sznIVA.IS.updateIdentities({
    eid: null
  });

  var retargetingConf = {
    rtgId: 1524717,
    consent: 0
  };
  window.rc.retargetingHit(retargetingConf);
  `;
  return (
    <>
      <Script
        type="text/javascript"
        src="https://c.seznam.cz/js/rc.js"
        strategy="lazyOnload"
      ></Script>
      <Script id="sklik-rtg" strategy="lazyOnload">
        {customScript}
      </Script>
    </>
  );
}

export default SklikRtg;
