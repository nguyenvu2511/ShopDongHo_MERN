import React, { useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import './News.css';
import { Link } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

function News() {
  const state = useContext(GlobalState);
  const [news] = state.newsAPI.news;
  const [newss, setNew] = useState('');
  const [token] = state.token;
  const [callback, setCallback] = state.newsAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState('');
  const [isAdmin] = state.userAPI.isAdmin;
  const [images, setImages] = useState(false);

  function handleEditorChange({ html, text }) {
    setNew({ ...newss, content: { html, text } });
  }
  console.log('newss', newss);
  const createNews = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/news/${id}`,
          {
            title: newss.title,
            content: newss.content,
            images,
          },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          '/api/news',
          {
            title: newss.title,
            content: newss.content,
            images,
          },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }
      setOnEdit(false);
      setNew('');
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editNews = async (id, title, content, images) => {
    setID(id);
    console.log(title, content, images);
    setNew({ title: title }, { content: content });
    setImages(images);
    setOnEdit(true);
  };

  const deleteNews = async (id) => {
    try {
      const res = await axios.delete(`/api/news/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];

      if (!file) return alert('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return alert('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return alert('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      const res = await axios.post('/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="news">
      {isAdmin ? (
        <>
          <label htmlFor="title">Hình ảnh</label>
          <div>
            <input type="file" name="file" onChange={handleUpload} />
          </div>

          <form onSubmit={createNews}>
            <label htmlFor="title">Tin tức</label>
            <input
              type="text"
              name="title"
              value={newss.title}
              required
              onChange={(e) => setNew({ ...newss, title: e.target.value })}
            />

            <button className="btn btn-primary" type="submit">
              {onEdit ? 'Sửa' : 'Thêm'}
            </button>
          </form>
          <MdEditor
            style={{ width: '100%', height: '300px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </>
      ) : (
        <h3>Tin tức</h3>
      )}

      <div className="container">
        <h3 className="title">Tin tức</h3>
        {news.map((item) => (
          <div className="row" key={item._id}>
            <Link
              to={`/news/${item._id}`}
              style={{ color: 'black', fontWeight: 'bold' }}
            >
              <img src={item.images.url} width="150px" height="100px" />
              <p>{item.title}</p>
            </Link>
            {isAdmin ? (
              <div>
                <button
                  onClick={() =>
                    editNews(item._id, item.title, item.content, item.images)
                  }
                >
                  Sửa
                </button>
                <button onClick={() => deleteNews(item._id)}>Xóa</button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
