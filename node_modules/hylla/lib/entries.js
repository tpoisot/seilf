/**
Create an entry object

 @param {String} entry The object representation of a citeproc json file
 */
function Entry(entry) {
  this.content = entry;
}

Entry.prototype.id = function() {
  var id = undefined;
  if (this.content.id) {
    id = this.content.id;
  }
  return id;
};

Entry.prototype.doi = function() {
  if (this.content.DOI) {
    return this.content.DOI;
  } else {
    return undefined;
  }
};

Entry.prototype.json = function() {
  return JSON.stringify(this.content, null, 2);
};

Entry.prototype.write = function() {
  // TODO: implement
}

Entry.prototype.read = function() {
  // TODO: implement
}

module.exports.Entry = Entry;
