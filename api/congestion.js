export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { place } = req.query;
  if (!place) return res.status(400).json({ error: 'place 파라미터 필요' });

  const API_KEY = '714e67426973747235335a6a4d6751';
  const url = `https://openapi.seoul.go.kr:8088/${API_KEY}/json/citydata_ppltn/1/1/${encodeURIComponent(place)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: '서울시 API 호출 실패', detail: e.message });
  }
}
