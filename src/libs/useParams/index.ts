export function useParams(url: string) {
  function parse(variable: string) {
    const query = url.substring(1);
    const vars = query.split('&');
    let value = undefined;
    vars.forEach(item => {
      const pair = item.split('=');
      if (decodeURIComponent(pair[0]) == variable) {
        value = decodeURIComponent(pair[1]);
      }
    });

    return value;
  }

  function removeParams(param: string) {
    const query = url.substring(1);
    const vars = query.split('&');

    const updates = vars
      .map(element => {
        const pair = element.split('=');
        return { name: pair[0], value: pair[1] };
      })
      .filter(element => element.name !== param);

    return updates.reduce((arr, item) => {
      return item.name ? arr + `${item.name}=${item.value}&` : '';
    }, '');
  }
  return {
    parse,
    removeParams,
  };
}
