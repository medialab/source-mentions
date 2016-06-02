var Sutils = {};

Sutils.getAll = (data, key) => { return _(data).map(key).value(); };

export default Sutils;
