class ApiHandler {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  search() {
    const keyword = this.queryString.key
      ? {
          name: { $regex: this.queryString.key, $options: "i" },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    //...this.queryString this fetch the url which contains (category,key,limit,page)
    const copyQuery = { ...this.queryString };
    const deleteKey = ["key", "limit", "page"];
    // this will delete all there keys(key,limit,page execpt category) from copyQuery
    deleteKey.forEach((element) => delete copyQuery[element]);
    this.query = this.query.find(copyQuery);
    return this;
  }
}
export default ApiHandler;
