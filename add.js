var hylla = require('hylla');
var request = require('sync-request');
var prompt = require('prompt');
var path = require('path').dirname(require.main.filename);

var lib = new hylla.Library(path);

var _commands = ["add", "search", "more", "export", "help"];
var _cmd = process.argv[2];

_pad = function(i, l) {
  return ("          " + String(i)).slice(-l);
}

add_reference = function(doi) {
  if (doi) {
    // Check doi unicity
    var doi_match = lib.entries.filter(function(e, i, a) {
      if (e.doi())  {
        return e.doi().trim().toLowerCase() == doi.trim().toLowerCase();
      } else {
        return false;
      }
    });
    // If there is a match on the DOI, we return the ID;
    if (doi_match.length > 0) {
      // Note that this is transparent for the user -- it give the same
      // output if it's a new, or existing, reference.
      console.log(doi_match[0].id());
    } else {
      // If new, return the ID after adding it.
      var infos = hylla.doi.refFromDoi(doi);
      var ref = lib.new(infos);
      console.log(ref);
    }
  }
}

search_reference = function(query) {
  // This is the crossref citation parsing API
  var base_crossref_url = "http://search.labs.crossref.org/dois?q="
  if (query) {
    var query_url = base_crossref_url + encodeURIComponent(query);
    var res = request('GET', query_url);
    var output = JSON.parse(res.getBody('utf-8')).filter(function(e, i, a) {
      return e.normalizedScore == 100
    });
    if (output.length > 0) {
      console.log(output[0].fullCitation);
      console.log("Is this correct? [y/n]");
      prompt.start();
      prompt.get(['Accept'], function(err, result) {
        if (result['Accept'] == 'y') add_reference(output[0].doi.replace(
          "http://dx.doi.org/", ""));
      });
    }
  }
}

more_reference = function(query) {
  // This is the crossref citation parsing API
  var base_crossref_url = "http://search.labs.crossref.org/dois?q="
  if (query) {
    var query_url = base_crossref_url + encodeURIComponent(query);
    var res = request('GET', query_url);
    var output = JSON.parse(res.getBody('utf-8'));
    if (output.length > 0) {
      for (var i = 0; i < output.length; i++) {
        var current = output[i];
        if (current.title == null) current.title = "No title";
        console.log("[" + _pad(i, 2) + "] (" + _pad(current.normalizedScore,
          3) + ") " + current.title.substr(0, 60));
      }
      prompt.start();
      prompt.get(['Reference'], function(err, result) {
        add_reference(output[parseInt(result["Reference"])].doi.replace(
          "http://dx.doi.org/", ""));
      });
    }
  }
}

help = function() {
  console.log("Usage");
  console.log("add 'doi'       Add a reference based on a doi");
  console.log("search 'query'  Best match from a text query");
  console.log("more 'query'    List of 20 best matches");
  console.log("export          Save the references to the default.json file");
}

if (_commands.indexOf(_cmd) >= 0) {

  if (_cmd == "add") {
    add_reference(process.argv[3]);
  }

  // Free-form search using crossref API
  if (_cmd == "search") {
    search_reference(process.argv[3]);
  }

  // Free-form search using crossref API -- but with more references
  if (_cmd == "more") {
    more_reference(process.argv[3]);
  }

  if (_cmd == "export") {
    lib.write();
  }

  if (_cmd == "help") {
    help();
  }

} else {
  help();
}
