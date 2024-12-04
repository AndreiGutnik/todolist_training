import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { Button, DatePicker, Flex, Space } from "antd"
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import * as css from './style.css'

interface DateNavigatorProps {
	currentDate: Dayjs
	setCurrentDate: (date: Dayjs) => void
}

export const DateNavigator = (props: DateNavigatorProps) => {
	const {currentDate, setCurrentDate} = props

  const handlePrev = () => {
    setCurrentDate(currentDate.subtract(1, 'day'));
  };

  const handleNext = () => {
    setCurrentDate(currentDate.add(1, 'day'));
  };

  return (
    <Flex className={css.container}>
      <Button onClick={handlePrev} color="primary" variant="link" ><LeftOutlined />Prev</Button>
      <DatePicker
				className={css.dateInput}
        value={currentDate}
        format="DD.MM.YYYY"
        onChange={(date) => setCurrentDate(date!)}
				suffixIcon={null}
				allowClear={false}
      />
      <Button onClick={handleNext} color="primary" variant="link" >Next<RightOutlined /></Button>
    </Flex>
  );
}