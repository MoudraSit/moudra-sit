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
      <script type="text/javascript" src="https://c.seznam.cz/js/rc.js"></script>
      <script>{customScript}ß</script>
    </>
  );
}

export default SklikRtg;
