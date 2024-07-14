import Head from "next/head";

function SklikConversion() {
  const customScript = ` window.sznIVA.IS.updateIdentities({
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
      <Head>
        <script type="text/javascript" src="https://c.seznam.cz/js/rc.js"></script>
        <script>customScript</script>
      </Head>
    </>
  );
}

export default SklikConversion;
