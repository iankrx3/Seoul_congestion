const https = require('https');

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { place } = req.query;
  if (!place) return res.status(400).json({ error: 'place 파라미터 필요' });

  const API_KEY = '714e67426973747235335a6a4d6751';
  const path = `/8088/${API_KEY}/json/citydata_ppltn/1/1/${encodeURIComponent(place)}`;

  const options = {
    hostname: 'openapi.seoul.go.kr',
    port: 8088,
    path: path,
    method: 'GET',
  };

  const apiReq = https.request(options, (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => { data += chunk; });
    apiRes.on('end', () => {
      try {
        res.status(200).json(JSON.parse(data));
      } catch (e) {
        res.status(500).json({ error: 'JSON 파싱 실패', raw: data.substring(0, 200) });
      }
    });
  });

  apiReq.on('error', (e) => {
    res.status(500).json({ error: '서울시 API 연결 실패', detail: e.message });
  });

  apiReq.end();
}