const http = require('http');

function parseXML(xml) {
  // AREA_CONGEST_LVL 파싱
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
  const options = {
    hostname: 'openapi.seoul.go.kr',
    port: 8088,
    path: `/${API_KEY}/xml/citydata/1/5/${encodeURIComponent(place)}`,
    method: 'GET',
  };

  let body = '';
  const apiReq = http.request(options, (apiRes) => {
    apiRes.setEncoding('utf8');
    apiRes.on('data', c => body += c);
    apiRes.on('end', () => {
      try {
        const parsed = parseXML(body);
        res.status(200).json({ SeoulRtd: { row: [parsed] } });
      } catch(e) {
        res.status(500).json({ error: 'XML 파싱 실패', raw: body.slice(0, 300) });
      }
    });
  });

  apiReq.on('error', e => res.status(500).json({ error: e.message, code: e.code }));
  apiReq.setTimeout(8000, () => { apiReq.destroy(); res.status(504).json({ error: '타임아웃' }); });
  apiReq.end();
}