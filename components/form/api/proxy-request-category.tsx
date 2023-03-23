async function ApiRequestCategory(idRequirment: string, category: string) {
  try {
    const response = await fetch("/api/tabidoo-category", {
      method: "POST",
      body: JSON.stringify({
        fields: {
          nazev: category,
          dotaz: {
            id: idRequirment,
          },
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //extract JSON from the http response
    const jsonObject = await response.json();

    //console.log(jsonObject);
  } catch (error) {
    console.log("There was an error ", error);
  }
}

export default ApiRequestCategory;
