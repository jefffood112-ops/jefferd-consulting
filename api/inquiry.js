// The legacy inquiry form is retired. Do not accept or forward submissions.
module.exports = (_req, res) => {
  res.status(410).json({ ok: false, error: 'inquiry_form_retired' });
};
