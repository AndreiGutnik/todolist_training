import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { Button, DatePicker, Flex, Space } from "antd"
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

import * as css from './style.css'

interface DateNavigatorProps {
	picker: Parameters<typeof DatePicker>[0]['picker']
	currentDate: Dayjs
	setCurrentDate: (date: Dayjs) => void
}

const INTERVAL = {
	date: 'day',
	week: 'week',
	month: 'month'
}

const FORMAT = {
	date: 'DD.MM.YYYY',
	week: 'WW[th] YYYY',
	month: 'MMM YYYY'
}

export const DateNavigator = (props: DateNavigatorProps) => {
	const {picker, currentDate, setCurrentDate} = props

  const handlePrev = () => {
    setCurrentDate(currentDate.subtract(1, INTERVAL[picker]));
  };

  const handleNext = () => {
    setCurrentDate(currentDate.add(1, INTERVAL[picker]));
  };

  return (
    <Flex className={css.container}>
      <Button onClick={handlePrev} color="primary" variant="link" ><LeftOutlined />Prev</Button>
      <DatePicker
				className={css.dateInput}
        value={currentDate}
        format={FORMAT[picker]}
        onChange={(date) => setCurrentDate(date!)}
				suffixIcon={null}
				allowClear={false}
				picker={picker}
      />
      <Button onClick={handleNext} color="primary" variant="link" >Next<RightOutlined /></Button>
    </Flex>
  );
}