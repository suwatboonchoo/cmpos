import React, { Component } from "react";
import "./stockCreate.css"; // Tell Webpack that Button.js uses these styles
import { connect } from "react-redux";
import * as actions from "../../actions/stock.action";
import { imageUrl } from "./../../constants";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

class StockCreate extends Component { 

  onClickSubmit = formValues => {
    var formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("price", formValues.price);
    formData.append("stock", formValues.stock);
    formData.append("upload_file", formValues.file);

    this.props.addProduct(this.props.history, formData);
  };

  showPreviewImage = () => {
    if (this.props.form) {
      let file = this.props.form.values.file_obj;
      if (file) {
        return <img src={file} style={{ height: 100 }} />;
      }
    }
  };

  render() {
    const { handleSubmit, change, dispatch } = this.props;
    return (
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content" style={{ maxWidth: "80%" }}>
          <div className="box box-primary" style={{ marginTop: 70 }}>
            <div className="box-header with-border">
              <p className="box-title" style={{ fontSize: 30 }}>
                Create
              </p>
            </div>
            <div className="box-body" style={{ marginTop: 30 }}>
              <form
                className="form-horizontal"
                onSubmit={handleSubmit(this.onClickSubmit)}
              >
                <div className="form-group">
                  <label className="col-sm-2 control-label" htmlFor="name">
                    Name
                  </label>
                  <div className="col-sm-10">
                    <Field
                      name="name"
                      component="input"
                      placeholder="โปรดระบุ"
                      className="form-control"
                      type="text"
                      id="name"
                    />
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                  <label className="col-sm-2 control-label" htmlFor="stock">
                    Stock
                  </label>
                  <div className="col-sm-10">
                    <div className="input-group">
                      <Field
                        name="stock"
                        component="input"
                        className="form-control"
                        type="number"
                      />
                      <span className="input-group-addon input-group-addon_custom">
                        PCS.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label" htmlFor="price">
                    Price
                  </label>
                  <div className="col-sm-10">
                    <div className="input-group">
                      <Field
                        name="price"
                        component="input"
                        className="form-control"
                        type="number"
                        id="price"
                      />
                      <span className="input-group-addon input-group-addon_custom">
                        ฿
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: 15 }}>
                  <div className="col-sm-12 col-sm-offset-2">
                    {this.showPreviewImage()}

                    <div className="wrap-upload-buttons control-label">
                      <ul className="btn-nav row" id="rcorners">
                        <li>
                          <span style={{ marginLeft: 2 }}>
                            <img
                              src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                              style={{ width: 25, height: 20 }}
                            />
                            <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                              Add Picture
                            </span>
                            <input
                              onChange={e => {
                                e.preventDefault();
                                dispatch(change("file", e.target.files[0]));
                                dispatch(change("file_obj", URL.createObjectURL(e.target.files[0])))
                              }}
                              component="input"
                              type="file"
                              name="image"
                              click-type="type1"
                              className="picupload"
                              multiple
                              accept="image/*"
                              id="files"
                              style={{ padding: "20px 0" }}
                            />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="box-footer" style={{ marginTop: 50 }}>
                  <button type="submit" className="btn btn-primary pull-right">
                    Submit
                  </button>
                  <a
                    onClick={() => {
                      this.props.history.goBack();
                    }}
                    type="Button"
                    className="btn btn-default pull-right"
                    style={{ marginRight: 10 }}
                  >
                    Cancel
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>
        {/* /.content */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stockReducer: state.stockReducer,
  form: state.form.stockCreateForm
});

StockCreate = connect(
  mapStateToProps,
  actions
)(StockCreate);

export default reduxForm({
  form: "stockCreateForm",
  initialValues: { price: 100, stock: 10 }
})(StockCreate);


