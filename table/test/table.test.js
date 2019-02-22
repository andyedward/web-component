import {
  html,
  fixture,
  expect,
} from '@open-wc/testing';

import '../table.js';

describe('True Checking', () => {
  it('is empty by default', async () => {
    const el = await fixture('<pwi-table config=""></pwi-table>');
    expect(el.config).to.be.equal("");
  });

  it('is empty by default2', async () => {
    const el = await fixture('<pwi-table config="" data=""></pwi-table>');
    expect(el.config).to.be.equal("");
    expect(el.data).to.be.equal("");

  });

  it('should have a header', async() => {
    const config = `{"columns": ["first column"]}`;
    const el = await fixture(`<pwi-table config='${config}' data=''></pwi-table>`);
    const result = el.createHeader(config);
    expect(result).to.be.equal("<th>first column</th>");
  })

  it('should return a row markup', async() => {
    const config = {"col1": "first column", "col2": "second column"};
    const el = await fixture(`<pwi-table config='${config}' data=''></pwi-table>`);
    const result = await el.getTableCellMarkup(config);
    console.log(result);
    expect(result).to.be.equal("<td>first column</td><td>second column</td>");
  })

  // it('false values will have a light-dom of <p>NOPE</p>', async () => {
  //   const el = await fixture('<get-result></get-result>');
  //   expect(el).dom.to.equal('<get-result><p>NOPE</p></get-result>');
  // });
  //
  // it('true values will have a light-dom of <p>YEAH</p>', async () => {
  //   const foo = 1;
  //   const el = await fixture(html`<get-result .success=${foo === 1}></get-result>`);
  //   expect(el.success).to.be.true;
  //   expect(el).dom.to.equal('<get-result><p>YEAH</p></get-result>');
  // });
});