import React from 'react';
import './Support.css';
function Support() {
  return (
    <div className="container">
      <div className="support-body">
        <div className="info col-6">
          <h3 className>
            <strong>LIÊN HỆ VỚI CHÚNG TÔI</strong>
          </h3>
          <ul>
            <li>Nguyễn Tiến Vũ</li>
            <li>Lê Văn Đạt</li>
            <li>Trần Nhật Quang</li>
            <div className="sp">
              <i className="fas fa-envelope"></i>{' '}
              <span>
                nguyentienvu.2511@gmail.com || levandat.1405@gmail.com ||
                nguyentienvu.2511@gmail.com
              </span>
              <br />
              <i className="fas fa-map-marker-alt"></i>{' '}
              <span>Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh</span>
            </div>
          </ul>
        </div>

        <div className="col-6 gg-map">
          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1251208107665!2d106.71229765031123!3d10.801727892266626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a459cb43ab%3A0x6c3d29d370b52a7e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVFAuSENNIC0gSFVURUNI!5e0!3m2!1svi!2s!4v1639751510403!5m2!1svi!2s"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Support;
