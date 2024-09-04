import styled from 'styled-components';

export const Main = styled.div`
  font-size: 14px;
  min-width: 1200px;
`;

export const Banner = styled.div`
  height: 300px;
  width: 100%;
  background-size: cover;
  position: relative;
  > .logo {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 140px;
    cursor: pointer;
  }
  > .container {
    position: relative;
    top: -40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;
    color: #fff;
    font-weight: bold;
    > .title {
      font-size: 36px;
    }
    > .gap {
      width: 400px;
      height: 2px;
      margin: 10px 0;
      background: rgba(255, 255, 255, 0.5);
    }
    > .subTitle {
      font-size: 20px;
    }
    > .search {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 500px;
      margin-top: 20px;
      > .input {
        flex: 1;
        height: 40px;
        padding: 0 10px;
        color: #000;
        font-weight: bold;
        font-size: 16px;
        border: none;
        outline: none;
      }
      > .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70px;
        height: 40px;
        color: #fff;
        background: #eeaa00;
        cursor: pointer;
      }
    }
  }
`;

export const Top = styled.div`
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  position: relative;
  top: -60px;
  margin: 0 auto;
  margin-bottom: -60px;

  > .item {
    width: 49%;
    height: 170px;
    margin-top: 20px;

    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    > .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 10px 20px;
      background: linear-gradient(to bottom right, #1e854500, #1e854510);
      > .img {
        width: 80px;
      }
      > .right {
        flex: 1;
        padding-left: 20px;
        position: relative;
        top: -10px;
        > .title {
          font-weight: bold;
          font-size: 30px;
          vertical-align: middle;
          > .number {
            padding: 0 10px;
            color: #1e8545;
            font-size: 50px;
            background-image: linear-gradient(to top, #1e8545 30%, white);
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        > .subItems {
          padding-top: 0px;
          padding-right: 80px;
          > .item {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            padding-top: 5px;

            color: #000;
            font-size: 14px;
            overflow: hidden;
            > .dot {
              display: inline-block;
              width: 8px;
              height: 8px;
              margin-right: 10px;
              background-color: #1e8545;
              border-radius: 50%;

              position: relative;
              top: 8px;
            }
            >.text{
              flex:1
            }
            &.disabled {
              color: #ccc;
              > .dot {
                background-color: #ccc;
              }
            }
          }
          
        }
      }
    }
  }
`;

export const Title = styled.div`
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 10px;
  width: 1200px;

  padding: 0 10px;
  color: #1e8545;
  font-weight: bold;
  font-size: 28px;
  background-image: linear-gradient(to top, #1e8545 30%, white);
  background-clip: text;
  -webkit-text-fill-color: transparent;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  > .dot {
    width: 28px;
    height: 28px;
    background-color: #1e8545;
    display: inline-block;
    margin-right: 10px;
  }
`;
export const Bottom = styled.div`
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  margin: 0 auto;

  > .item {
    width: 32%;
    height: 250px;
    margin-top: 20px;

    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    > .wrapper {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 10px 10px;
      background: linear-gradient(to bottom right, #1e854500, #1e854510);

      > .right {
        flex: 1;
        > .title {
          color: #1e8545;
          font-weight: bold;
          font-size: 45px;
          vertical-align: middle;
          background-image: linear-gradient(to top, #1e8545 30%, white);
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        > .subItems {
          padding-top: 0px;
          display: flex;
          >.col{
            flex: 1;
            &:nth-child(2){
              padding-left: 10px;
            }
            > .item {
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
              padding-top: 5px;
              color: #000;
              font-size: 14px;
              overflow: hidden;
              > .dot {
                display: inline-block;
                width: 8px;
                height: 8px;
                margin-right: 5px;
                background-color: #1e8545;
                border-radius: 50%;

                position: relative;
                top: 8px;
              }
              >.text{
                flex:1;
              }
              &.disabled {
                color: #ccc;
                > .dot {
                  background-color: #ccc;
                }
              }
            }
          }
        }
      }
    }
  }
`;
