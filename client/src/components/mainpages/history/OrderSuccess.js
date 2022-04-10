import React from 'react';

function OrderSuccess() {
  return (
    <div className="container body">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>ĐẶT HÀNG THÀNH CÔNG !</h1>

            <div className="error-details">
              Chúng tôi đã nhận được yêu cầu mua hàng của bạn, <br /> chúng tôi
              sẽ sớm liên hệ và giao hàng đến cho bạn.
            </div>
            <div className="error-actions">
              <a href="/" className="btn btn-primary btn-lg">
                <span className="glyphicon glyphicon-home"></span>
                Go Home{' '}
              </a>
              <a
                href="http://www.jquery2dotnet.com"
                className="btn btn-warning"
              >
                <span className="glyphicon glyphicon-envelope"></span> Contact
                Support{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
