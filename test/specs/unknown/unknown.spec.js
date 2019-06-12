"use strict";

const { host } = require("host-environment");
const { expect } = require("chai");
const SwaggerParser = require("../../..");
const helper = require("../../utils/helper");
const path = require("../../utils/path");
const parsedSchema = require("./parsed");
const dereferencedSchema = require("./dereferenced");

describe("API with $refs to unknown file types", function () {
  let windowOnError, testDone;

  beforeEach(function () {
    // Some old Webkit browsers throw an error when downloading zero-byte files.
    windowOnError = host.global.onerror;
    host.global.onerror = function () {
      testDone();
      return true;
    };
  });

  afterEach(function () {
    host.global.onerror = windowOnError;
  });

  it("should parse successfully", function (done) {
    testDone = done;
    let parser = new SwaggerParser();
    parser
      .parse(path.rel("specs/unknown/unknown.yaml"))
      .then(function (api) {
        expect(api).to.equal(parser.api);
        expect(api).to.deep.equal(parsedSchema.api);
        expect(parser.$refs.paths()).to.deep.equal([path.abs("specs/unknown/unknown.yaml")]);
        done();
      })
      .catch(done);
  });

  it("should resolve successfully", function (done) {
    testDone = done;
    helper.testResolve(
      "specs/unknown/unknown.yaml", parsedSchema.api,
      "specs/unknown/files/blank", parsedSchema.blank,
      "specs/unknown/files/text.txt", parsedSchema.text,
      "specs/unknown/files/page.html", parsedSchema.html,
      "specs/unknown/files/binary.png", parsedSchema.binary
    )(done);
  });

  it("should dereference successfully", function (done) {
    testDone = done;
    let parser = new SwaggerParser();
    parser
      .dereference(path.rel("specs/unknown/unknown.yaml"))
      .then(function (api) {
        expect(api).to.equal(parser.api);

        api.paths["/files/text"].get.responses["200"].default =
          helper.convertNodeBuffersToPOJOs(dereferencedSchema.paths["/files/text"].get.responses["200"].default);

        api.paths["/files/html"].get.responses["200"].default =
          helper.convertNodeBuffersToPOJOs(dereferencedSchema.paths["/files/html"].get.responses["200"].default);

        api.paths["/files/blank"].get.responses["200"].default =
          helper.convertNodeBuffersToPOJOs(dereferencedSchema.paths["/files/blank"].get.responses["200"].default);

        api.paths["/files/binary"].get.responses["200"].default =
          helper.convertNodeBuffersToPOJOs(dereferencedSchema.paths["/files/binary"].get.responses["200"].default);

        done();
      })
      .catch(done);
  });

  it("should validate successfully", function (done) {
    testDone = done;
    let parser = new SwaggerParser();
    parser
      .validate(path.rel("specs/unknown/unknown.yaml"))
      .then(function (api) {
        expect(api).to.equal(parser.api);

        api.paths["/files/text"].get.responses["200"].default =
          helper.convertNodeBuffersToPOJOs(dereferencedSchema.paths["/files/text"].get.responses["200"].default);

        api.paths["/files/html"].get.responses["200"].default =
          helper.convertNodeBuffersToPOJOs(dereferencedSchema.paths["/files/html"].get.responses["200"].default);

        api.paths["/files/blank"].get.responses["200"].default =
          helper.convertNodeBuffersToPOJOs(dereferencedSchema.paths["/files/blank"].get.responses["200"].default);

        api.paths["/files/binary"].get.responses["200"].default =
          helper.convertNodeBuffersToPOJOs(dereferencedSchema.paths["/files/binary"].get.responses["200"].default);

        done();
      })
      .catch(done);
  });

  it("should bundle successfully", function (done) {
    testDone = done;
    let parser = new SwaggerParser();
    parser
      .bundle(path.rel("specs/unknown/unknown.yaml"))
      .then(function (api) {
        expect(api).to.equal(parser.api);

        api.paths["/files/text"].get.responses["200"].default =
          helper.convertNodeBuffersToPOJOs(dereferencedSchema.paths["/files/text"].get.responses["200"].default);

        api.paths["/files/html"].get.responses["200"].default =
          helper.convertNodeBuffersToPOJOs(dereferencedSchema.paths["/files/html"].get.responses["200"].default);

        api.paths["/files/blank"].get.responses["200"].default =
          helper.convertNodeBuffersToPOJOs(dereferencedSchema.paths["/files/blank"].get.responses["200"].default);

        api.paths["/files/binary"].get.responses["200"].default =
          helper.convertNodeBuffersToPOJOs(dereferencedSchema.paths["/files/binary"].get.responses["200"].default);

        done();
      })
      .catch(done);
  });
});
