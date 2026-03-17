function parseXML(xml) {
  const get = (tag) => {
    const m = xml.match(new RegExp(`<${tag}>([^<]*)<\/${tag}>`));
    return m ? m[1] : null;
  };
  return {
    AREA_NM: get('AREA_NM'),
    AREA_CONGEST_LVL: get('AREA_CONGEST_LVL'),
    AREA_CONGEST_MSG: get('AREA_CONGEST_MSG'),
    PPLTN_MIN: get('PPLTN_MIN'),
    PPLTN_MAX: get('PPLTN_MAX'),
    PPLTN_TIME: get('PPLTN_TIME'),
    X_COORD: get('X_COORD'),
    Y_COORD: get('Y_COORD'),
  };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { place } = req.query;
  if (!place) return res.status(400).json({ error: 'place 필요' });

  const API_KEY = '714e67426973747235335a6a4d6751';
  const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/xml/citydata/1/5/${encodeURIComponent(place)}`;

  try {
    const response = await fetch(url);
    const body = await response.text();
    const parsed = parseXML(body);
    res.status(200).json({ SeoulRtd: { row: [parsed] } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};