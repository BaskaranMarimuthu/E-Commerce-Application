class ApiHandler {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: { $regex: this.queryString.keyword, $options: "i" },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    //...this.queryString this fetch the url which contains (category,key,limit,page)
    const copyQuery = { ...this.queryString };
    const deleteKey = ["keyword", "limit", "page"];
    // this will delete all there keys(key,limit,page execpt category) from copyQuery
    deleteKey.forEach((element) => delete copyQuery[element]);
    this.query = this.query.find(copyQuery);
    return this;
  }
  pagination(productPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = productPerPage * (currentPage - 1);
    this.query = this.query.limit(productPerPage).skip(skip);
    return this;
  }
}
export default ApiHandler;
