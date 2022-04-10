import React from 'react';
import './Footer.css';
function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-content">
          <div className="logo">{/* <img src={'logo'} /> */}</div>
          <div className="about">
            <h3>Thành viên thực hiện</h3>
            <ul>
              <li>
                <p>Nguyễn Tiến Vũ</p>
              </li>
              <li>
                <p>Lê Văn Đạt</p>
              </li>
              <li>
                <p>Trần Nhật Quang</p>
              </li>
            </ul>
          </div>
          <div className="listCourse">
            <a target="_blank" href="https://github.com/nguyenvu.2511">
              <img src={''} />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100075489367618"
            >
              <img src={''} />
            </a>
            <a target="_blank" href="nguyentienvu.2511@gmail.com">
              <img src={''} />
            </a>
          </div>
        </div>
        <div className="descripsion">
          <p>
            <b style={{ color: '#71807a' }}>Website</b> được tạo ra với mục đích
            học tập và phục vụ cho đồ án môn học. Mọi cá nhân, tổ chức trong
            Website đều là giả định. Mọi sự trùng hợp xảy ra có thể là ngẫu
            nhiên.
          </p>
          <p>
            <b style={{ color: '#71807a' }}></b> Xin chân thành cảm ơn ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
