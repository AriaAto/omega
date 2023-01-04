import { test } from '@playwright/test';
import { setQuerySelectValue } from '../../utils/form';
import { gotoPageAndExpectUrl, useUserStorageState, gotoRoadSimulator } from '../../utils/global';
import { checkDataset, connectMqtt } from '../../utils/road_simulator';
import { checkEmptyTable, checkTableRowLength } from '../../utils/table';

test.describe('The Sds Page', () => {
  const pageUrl = '/event/sds';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();
  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('用路侧模拟器发送[数据共享]数据', async ({ page }) => {
    await gotoRoadSimulator(page);
    await connectMqtt(page);
    await checkDataset(page, 'SDS_track');
    await checkDataset(page, 'msg_VIR_SDS');
    // 直到loading结束再点击发送按钮
    await page.locator('#loading-SDS_track').waitFor({ state: 'hidden' });
    await page.click('#publishDataSetButton');
    await page.waitForTimeout(10000); // 发送10s数据后停止发送
    await page.click('#connectButton');
  });

  test('成功接收到数据', async ({ page }) => {
    page.goto(pageUrl);
    await checkTableRowLength(page);
  });

  test('成功通过下拉框筛选数据', async ({ page }) => {
    page.goto(pageUrl);
    await setQuerySelectValue(page, '#equipmentType');
    await checkEmptyTable(page);
  });
});
