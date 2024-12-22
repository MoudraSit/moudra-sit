import Script from "next/script";

function SklikConversion() {
  const handleScriptLoad = () => {
    // @ts-ignore
    if (window.sznIVA?.IS) {
      // @ts-ignore
      window.sznIVA.IS.updateIdentities({ eid: null });

      const conversionConf = {
        id: 100210649,
        value: null,
        consent: 0,
      };
      // @ts-ignore
      window.rc?.conversionHit(conversionConf);
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

export default SklikConversion;
