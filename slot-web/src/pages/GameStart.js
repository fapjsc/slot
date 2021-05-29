import "./GameStart.css";
import { Button } from "antd";
import Layout from "antd/lib/layout/layout";

const GameStart = () => {
  return (
    <Layout>
      <div className="divPosition">
        <img className="backImg" src={"/barLeft.jpg"} />
      </div>
      <div className="divPosition">
        <img className="backImg" src={"/center.jpg"} />
        <Button className="buttonPosition">MAX BET</Button>
      </div>
      <div className="divPosition">
        <img className="backImg" src={"/barRight.jpg"} />
      </div>

      <div>
        {/* <Button className="buttonPosition2" type="primary">
            ssscccccs
          </Button> */}
      </div>
      <Button type="text">ssss</Button>
    </Layout>
  );
};

export default GameStart;
