export function useParams() {
  function parse(variable: string, targetUrl?: string): string {
    const query = targetUrl || window.location.search.substring(1);
    const vars = query.split('&');
    let value = undefined;
    vars.forEach(item => {
      const pair = item.split('=');
      if (decodeURIComponent(pair[0]) == variable) {
        value = decodeURIComponent(pair[1]);
      }
    });

    return value || '1';
  }

  function removeParams(param: string, targetUrl?: string) {
    const url = targetUrl || window.location.search;
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
