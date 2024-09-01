import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from '@nextui-org/react';
import {
  IconMedal2,
  IconParkingCircle,
  IconCup,
  IconGift,
} from '@tabler/icons-react';

export default function BlueRewardCard() {
  return (
    <>
      <Card className="w-1/3">
        <CardHeader className="flex gap-3">
          <IconMedal2 className="w-14 h-14 mx-auto text-[#2196f3]" />
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-center text-lg font-bold text-[#2196f3]">
            藍藍會員
          </p>
        </CardBody>
        <Divider />
        <CardBody>
          <div className="flex p-1">
            <div className="w-[20%] flex">
              <IconParkingCircle className="w-8 h-8 mx-auto my-auto text-[#2196f3]" />
            </div>
            <div className="w-[80%]">
              <p className="p-2 text-left text-foreground/80 text-sm">
                點數累積
              </p>
              <p className="p-2 text-center text-foreground/60 text-base">
                消費即可累積第一影城點數。
                <p className="text-end text-foreground/60 text-sm">
                  （10元即可獲得1點）
                </p>
              </p>
            </div>
          </div>
          <Divider className="my-2" />
          <div className="flex p-1">
            <div className="w-[20%] flex">
              <IconCup className="w-8 h-8 mx-auto my-auto text-[#ED6169]" />
            </div>
            <div className="w-[80%]">
              <p className="p-2 text-left text-foreground/80 text-sm">
                會員點數兌換
              </p>
              <p className="p-2 text-center text-foreground/60 text-base">
                達指定點數即可兑換電影票/餐飲/商品。
              </p>
            </div>
          </div>
          <Divider className="my-2" />
          <div className="flex p-1">
            <div className="w-[20%] flex">
              <IconGift className="w-8 h-8 mx-auto my-auto text-[#d7263d]" />
            </div>
            <div className="w-[80%]">
              <p className="p-2 text-left text-foreground/80 text-sm">生日禮</p>
              <p className="p-2 text-center text-foreground/60 text-base">
                於生日當月持有效證件來觀影，即贈送可樂一杯。
              </p>
            </div>
          </div>
        </CardBody>

        <Divider />
        <CardFooter className="flex items-center justify-center">
          <Link
            className="text-[#0488c8]"
            href="http://localhost:5173/MovieClass"
          >
            點我訂票去
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
