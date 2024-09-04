import { useRef } from 'react';
import { PageRoutes } from '../../conf/Global';
import imageBg from './images/bg.png';
import imageLogo from './images/logo.png';
import imageTop1 from './images/top1.png';
import imageTop2 from './images/top2.png';
import imageTop3 from './images/top3.png';
import imageTop4 from './images/top4.png';
import { Banner, Bottom, Main, Title, Top } from './styles';
import * as QueryString from 'query-string';
import { useHistory } from 'react-router';

export default function () {
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const query = inputRef?.current?.value || '';
    // /search?page=1&query=%25E4%25BD%25A0%25E5%25A5%25BD&unionType=0
    const search = QueryString.stringify(
      {
        // ...filtersToQueryStringParams(constructedFilters),
        query: encodeURIComponent(query),
        page: 1,
        unionType: 0,
        // sortOption: selectedSortOption,
      },
      // { arrayFormat: 'comma' },
    );
    history.push({
      pathname: `${PageRoutes.SEARCH}`,
      search,
    });
  }
  const handleGoHome = ()=>{
    history.push({
      pathname: `/home`,
    });
  }
  return (
    <Main>
      <Banner
        style={{
          backgroundImage: `url(${imageBg})`,
        }}
      >
        <div className="container">
          <div className="title">集团数据目录</div>
          <div className="gap"></div>
          <div className="subTitle">Wilmar Data Catalog</div>
          <div className="search">
            <input ref={inputRef} className="input" placeholder="请输入表/字段/业务对象…" onKeyPress={(e) => {

              if (e.code.toLocaleLowerCase() === 'enter') {
                handleSearch();
              }

            }} />
            <div className="button" onClick={handleSearch}>搜索</div>
          </div>
        </div>
        <img src={imageLogo} className="logo" alt="logo" onClick={handleGoHome} />
      </Banner>
      <Top>
        {[
          {
            id: '0',
            img: imageTop1,
            name: '平台',
            num: 8,
            subItems: [
              { id: '00', name: '涉及营销、运营、供应链、生产、物流、财务、主数据、数据共8个平台', disabled: false },
              { id: '01', name: '未来：供应链金融、采购、质量、人事、公共', disabled: true },
            ],
          },
          {
            id: '1',
            img: imageTop2,
            name: '来源系统',
            num: 18,
            subItems: [
              { id: '10', name: 'SAP 、DMS 、EPM 、CCP……', disabled: false },
              { id: '11', name: '未来：WMS 、LIMS…', disabled: true },
            ],
          },
          {
            id: '2',
            img: imageTop3,
            name: '表',
            num: 1704,
            subItems: [
              { id: '20', name: 'SAP:256个', disabled: false },
              { id: '21', name: '…', disabled: false }],
          },
          {
            id: '3',
            img: imageTop4,
            name: '字段',
            num: 54029,
            subItems: [
              { id: '30', name: '已补充系统描述：xx个(来源系统梳理中）', disabled: false },
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
                          <span className="text">{subItem.name}</span>
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
              { id: '00', name: '终端客户、标准客户', disabled: false },
              { id: '01', name: '经销商客销售、库存', disabled: false },
              { id: '02', name: '订单、提单、发票', disabled: false },
              { id: '03', name: 'POS销量、库存', disabled: false },
              { id: '04', name: '固定任务', disabled: false },

              { id: '05', name: '滚动计划', disabled: true },
              { id: '05', name: '销售预测', disabled: true },
              { id: '06', name: '…', disabled: true },
            ],
          },
          {
            id: '1',
            name: '供应链域',
            num: 6,
            subItems: [
              { id: '04', name: '要货计划', disabled: false },
              { id: '04', name: '采购订单', disabled: false },
              { id: '04', name: '出入库明细', disabled: false },
              { id: '04', name: '账面库存（SAP）', disabled: false },

              { id: '05', name: '意向', disabled: true },
              { id: '05', name: '寻源', disabled: true },
              { id: '05', name: '绩效', disabled: true },
              { id: '05', name: '生产排产', disabled: true },
              { id: '05', name: '…', disabled: true },
            ],
          },
          {
            id: '2',
            name: '物流域',
            num: 2,

            subItems: [
              { id: '04', name: '实物库存（ WMS ）', disabled: false },
              { id: '04', name: '现场管理（一卡通）', disabled: false },

              { id: '05', name: '运单', disabled: true },
              { id: '05', name: '仓储', disabled: true },
              { id: '05', name: 'POI', disabled: true },
              { id: '05', name: '…', disabled: true },
            ],
          },
          {
            id: '3',
            name: '生产域',
            num: 3,
            subItems: [
              { id: '04', name: '生产订单', disabled: false },
              { id: '04', name: '生产产出（MES)', disabled: false },
              { id: '04', name: '工厂点位指标（PIMS)', disabled: false },

              { id: '05', name: 'BOM', disabled: true },
              { id: '05', name: '工艺路线', disabled: true },
              { id: '05', name: '质检', disabled: true },
              { id: '05', name: '人员排班', disabled: true },
              { id: '05', name: '…', disabled: true },
            ],
          },
          {
            id: '4',
            name: '财务域',
            num: 4,

            subItems: [
              { id: '04', name: '财务共享：报销单抬头、明细、流程审批、凭证信息', disabled: false },

              { id: '05', name: '总账', disabled: true },
              { id: '05', name: '往来明细', disabled: true },
              { id: '05', name: '产品成本分析', disabled: true },
              { id: '05', name: '资金', disabled: true },
              { id: '05', name: '…', disabled: true },
            ],
          },
          {
            id: '5',
            name: '数据域',
            num: 10,
            subItems: [
              { id: '04', name: '物料基础&管理信息', disabled: false },
              { id: '04', name: '客户基础信息、销售范围&合作范围信息', disabled: false },
              { id: '04', name: '供应商基础信息', disabled: false },
              { id: '04', name: '公司工厂组织架构信息', disabled: false },
              { id: '04', name: '工厂人员信息', disabled: false },

              { id: '05', name: '总账科目', disabled: true },
              { id: '05', name: '成本中心', disabled: true },
              { id: '05', name: '规则资产', disabled: true },
              { id: '05', name: '…', disabled: true },
            ],
          },
        ].map((item) => {

          const itemA = item.subItems.filter(x => x.disabled);
          const itemB = item.subItems.filter(x => !x.disabled);
          return (
            <div key={item.id} className="item">
              <div className="wrapper">
                <div className="right">
                  <div className="title">
                    <span>{item.name}</span>
                    {/* <span className="number">：{item.num}</span>
                    <span>个</span> */}
                  </div>
                  <div className="subItems">
                    <div className="col">
                      {itemB.map((subItem) => {
                        return (
                          <div
                            key={subItem.id}
                            className={subItem.disabled ? 'item disabled' : 'item'}
                          >
                            <span className="dot"></span>
                            <span className="text">{subItem.name}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="col">
                      {itemA.map((subItem) => {
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
            </div>
          );
        })}
      </Bottom>
    </Main>
  );
}
