import Script from "next/script";

function SklikRtg() {
  const handleScriptLoad = () => {
    // @ts-ignore
    if (window.sznIVA?.IS) {
      // @ts-ignore
      window.sznIVA.IS.updateIdentities({ eid: null });

      const retargetingConf = {
        rtgId: 1524717,
        consent: 0,
      };
      // @ts-ignore
      window.rc?.retargetingHit(retargetingConf);
    } else {
      console.error("sznIVA or IS is not available.");
    }
  };

  return (
    <>
      <Script
        type="text/javascript"
        src="https://c.seznam.cz/js/rc.js"
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
      />
    </>
  );
}

export default SklikRtg;
