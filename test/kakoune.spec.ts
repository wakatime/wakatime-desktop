import Kakoune from "../src/editors/kakoune";

const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

describe("Kakoune", () => {
  let kakoune: Kakoune;
  let isDirectoryStub: any;
  let fileExistsSyncStub: any;

  beforeEach(() => {
    kakoune = new Kakoune();
    isDirectoryStub = sinon.stub(kakoune, "isDirectory");
    fileExistsSyncStub = sinon.stub(kakoune, "fileExistsSync");
  });
  afterEach(() => {
    isDirectoryStub.restore();
    fileExistsSyncStub.restore();
  });
  it("should return the correct key name", () => {
    const result = kakoune.key;
    expect(result).to.equal("kakoune");
  });
  it("should return the correct editor name", () => {
    const result = kakoune.name;
    expect(result).to.equal("Kakoune");
  });
  it("should return TRUE if editor is installed", async () => {
    isDirectoryStub.resolves(true);
    const result = await kakoune.isEditorInstalled();
    expect(result).to.be.true;
  });
  //   it("should return FALSE if editor is not installed", async () => {
  //     isDirectoryStub.resolves(false);
  //     const result = await kakoune.isEditorInstalled();
  //     expect(result).to.be.false;
  //   });
  it("should return TRUE if plugin is installed", async () => {
    fileExistsSyncStub.resolves(true);
    const result = await kakoune.isPluginInstalled();
    expect(result).to.be.true;
  });
  it("should return FALSE if plugin is not installed", async () => {
    fileExistsSyncStub.resolves(false);
    const result = await kakoune.isPluginInstalled();
    expect(result).to.be.false;
  });
});
