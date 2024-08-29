import imageBg from './images/bg.png';
import imageLogo from './images/logo.png';
import imageTop1 from './images/top1.png';
import imageTop2 from './images/top2.png';
import imageTop3 from './images/top3.png';
import imageTop4 from './images/top4.png';
import { Banner, Bottom, Main, Title, Top } from './styles';

export default function () {
  return (
    <Main>
      <Banner
        style={{
          backgroundImage: `url(${imageBg})`,
        }}
      >
        <img src={imageLogo} className="logo" alt="logo" />
        <div className="container">
          <div className="title">集团数据目录</div>
          <div className="gap"></div>
          <div className="subTitle">Wilmar Data Catalog</div>
          <div className="search">
            <input className="input" placeholder="请输入表/字段/业务对象…" />
            <div className="button">搜索</div>
          </div>
        </div>
      </Banner>
      <Top>
        {[
          {
            id: '0',
            img: imageTop1,
            name: '数据源',
            num: 1,
            subItems: [
              { id: '00', name: '数据平台', disabled: false },
              { id: '01', name: '未来：BW', disabled: true },
            ],
          },
          {
            id: '1',
            img: imageTop2,
            name: '来源系统',
            num: 18,
            subItems: [
              { id: '10', name: 'EPMDMSSAPCCP……', disabled: false },
              { id: '11', name: '未来：LOG 3.0', disabled: true },
            ],
          },
          {
            id: '2',
            img: imageTop3,
            name: '表',
            num: 1704,
            subItems: [{ id: '20', name: 'SAP:256个', disabled: false }],
          },
          {
            id: '3',
            img: imageTop4,
            name: '字段',
            num: 54029,
            subItems: [
              { id: '30', name: '已补充系统描述：？个', disabled: false },
              { id: '31', name: '...', disabled: true },
            ],
          },
        ].map((item, index) => {
          return (
            <div key={item.id} className="item">
              <div className="wrapper">
                <img
                  className="img"
                  src={item.img}
                  alt={item.name}
                  style={{
                    // 修正图片视觉误差
                    width: index === 2 ? '60px' : undefined,
                    marginLeft: index === 2 ? '20px' : undefined,
                  }}
                />
                <div className="right">
                  <div className="title">
                    <span>{item.name}</span>
                    <span className="number">{item.num}</span>
                    <span>个</span>
                  </div>
                  <div className="subItems">
                    {item.subItems.map((subItem) => {
                      return (
                        <div
                          key={subItem.id}
                          className={subItem.disabled ? 'item disabled' : 'item'}
                        >
                          <span className="dot"></span>
                          <span>{subItem.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Top>

      <Title>
        <span className="dot"></span>
        <span>业务域资产分布</span>
      </Title>

      <Bottom>
        {[
          {
            id: '0',
            name: '营销域',
            num: 11,
            subItems: [
              { id: '00', name: 'Sell Out/Sell in、经销商库存', disabled: false },
              { id: '01', name: '终端客户、标准客户', disabled: false },
              { id: '02', name: 'POS销量/库存', disabled: false },
              { id: '03', name: '固定任务', disabled: false },
              { id: '04', name: '滚动计划、销售预测', disabled: true },
            ],
          },
          {
            id: '1',
            name: '供应链域',
            num: 6,
            subItems: [
              { id: '10', name: '要货计划', disabled: false },
              { id: '11', name: '采购订单', disabled: false },
              { id: '12', name: '出入库明细', disabled: false },
              { id: '13', name: '寻源、采购绩效', disabled: true },
            ],
          },
          {
            id: '2',
            name: '物流域',
            num: 2,

            subItems: [
              { id: '20', name: '一卡通车辆进出场、异常日志', disabled: false },
              { id: '21', name: '运单', disabled: true },
              { id: '22', name: '仓储', disabled: true },
              { id: '23', name: '送货地址', disabled: true },
            ],
          },
          {
            id: '3',
            name: '生产域',
            num: 3,
            subItems: [
              { id: '30', name: '生产订单', disabled: false },
              { id: '31', name: '生产产出', disabled: false },
              { id: '32', name: '工艺路线', disabled: true },
              { id: '33', name: '质检', disabled: true },
              { id: '34', name: '人员排班', disabled: true },
            ],
          },
          {
            id: '4',
            name: '财务域',
            num: 4,

            subItems: [
              { id: '40', name: '报销单抬头、明细、流程审批、凭证信息', disabled: false },
              { id: '41', name: '总账', disabled: true },
              { id: '42', name: '往来明细', disabled: true },
              { id: '43', name: '产品成本分析', disabled: true },
            ],
          },
          {
            id: '5',
            name: '数据域',
            num: 10,
            subItems: [
              {
                id: '50',
                name: '主数据信息（物料、客户、供应商、公司组织架构、通用基础项）',
                disabled: false,
              },
              { id: '51', name: '工厂人员信息', disabled: false },
              { id: '52', name: '规则资产', disabled: true },
            ],
          },
        ].map((item) => {
          return (
            <div key={item.id} className="item">
              <div className="wrapper">
                <div className="right">
                  <div className="title">
                    <span>{item.name}：</span>
                    <span className="number">{item.num}</span>
                    <span>个</span>
                  </div>
                  <div className="subItems">
                    {item.subItems.map((subItem) => {
                      return (
                        <div
                          key={subItem.id}
                          className={subItem.disabled ? 'item disabled' : 'item'}
                        >
                          <span className="dot"></span>
                          <span>{subItem.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Bottom>
    </Main>
  );
}
