import { convertTimeToDate, convertDateToLocalTime } from '../resolveTime';
import { padTime } from '../displayTime';

const date = new Date('2019-10-10T11:03:11.044Z');
const initialDate = date.toISOString();

describe('convertTimeToDate', () => {
  it('should return valid date from 24h format', () => {
    expect(convertTimeToDate(initialDate, '12', '00', '00')).toBe(
      new Date(date.setHours(12, 0, 0)).toISOString(),
    );
    expect(convertTimeToDate(initialDate, '01', '00', '00')).toBe(
      new Date(date.setHours(1, 0, 0)).toISOString(),
    );
    expect(convertTimeToDate(initialDate, '23', '59', '01')).toBe(
      new Date(date.setHours(23, 59, 1)).toISOString(),
    );
    expect(convertTimeToDate(initialDate, '12', '00', '00')).toBe(
      new Date(date.setHours(12, 0, 0)).toISOString(),
    );
    expect(convertTimeToDate(initialDate, '01', '00', '00')).toBe(
      new Date(date.setHours(1, 0, 0)).toISOString(),
    );
    expect(convertTimeToDate(initialDate, '23', '59', '01')).toBe(
      new Date(date.setHours(23, 59, 1)).toISOString(),
    );
  });

  it('should return valid date from 12h format', () => {
    expect(convertTimeToDate(initialDate, '12', '00', '00', 'PM')).toBe(
      new Date(date.setHours(12, 0, 0)).toISOString(),
    );
    expect(convertTimeToDate(initialDate, '12', '00', '00', 'AM')).toBe(
      new Date(date.setHours(0, 0, 0)).toISOString(),
    );
    expect(convertTimeToDate(initialDate, '11', '59', '01', 'PM')).toBe(
      new Date(date.setHours(23, 59, 1)).toISOString(),
    );
    expect(convertTimeToDate(initialDate, '11', '59', '01', 'AM')).toBe(
      new Date(date.setHours(11, 59, 1)).toISOString(),
    );
    expect(convertTimeToDate(initialDate, '11', '59', '01', 'PM')).toBe(
      new Date(date.setHours(23, 59, 1)).toISOString(),
    );
    expect(convertTimeToDate(initialDate, '11', '59', '01', 'AM')).toBe(
      new Date(date.setHours(11, 59, 1)).toISOString(),
    );
  });
});

describe('convertDateToLocalTime', () => {
  const date1 = new Date('2019-10-10T05:03:11.000Z');
  const date2 = new Date('2019-10-10T00:03:11.000Z');

  it('should return array of time for 24h format', () => {
    const result1 = date1
      .toLocaleTimeString('en-US', { hour12: false })
      .replace(' ', ':');
    const result2 = date2
      .toLocaleTimeString('en-US', { hour12: false })
      .replace(' ', ':');
    expect(convertDateToLocalTime(date1.toISOString(), '24').join(':')).toEqual(
      result1,
    );
    expect(convertDateToLocalTime(date2.toISOString(), '24').join(':')).toEqual(
      result2,
    );
  });

  it('should return array of time for 12h format', () => {
    const [hour1, ...result1] = date1
      .toLocaleTimeString('en-US')
      .replace(' ', ':')
      .split(':');
    const [hour2, ...result2] = date2
      .toLocaleTimeString('en-US')
      .replace(' ', ':')
      .split(':');
    expect(convertDateToLocalTime(date1.toISOString())).toEqual([
      padTime(hour1),
      ...result1,
    ]);
    expect(convertDateToLocalTime(date2.toISOString())).toEqual([
      padTime(hour2),
      ...result2,
    ]);
  });
});
