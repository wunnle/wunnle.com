import React from 'react'

import styles from './PostList.module.css'

const PostList = ({ children }) => <div className={styles.posts}>{children}</div>

export default PostList
