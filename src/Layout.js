import React, { useMemo } from "react";
import Header from "components/Header";

/* 
    其他組件 import 此 Layout component 時,
    能將其他組件或標籤放置在 {props.children} 位置, 與此公版佈局一起被渲染

*/
const Layout = props => {
  const user = useMemo(() => {
    return global.auth.getUser() || {}; // user 為 unll 時需回傳空物件, 否則會報錯
  }, []);

  return (
    <div className="main">
      <Header user={user} />
      {props.children}
    </div>
  );
};

export default Layout;
