// 虚构的演示周，用于预览单课、多课和空课表三种状态。
const week = [
  { date: '4月6日 · 周一', lessons: [
    { name: ['观星入门'], time: '08:30–09:15', sections: '1', room: '星图室', color: '#F5DA72' },
    { name: ['纸飞机实验'], time: '10:20–11:05', sections: '3', room: '风洞室', color: '#C5AFF5' }
  ] },
  { date: '4月7日 · 周二', lessons: [], note: '今天没有安排课程' },
  { date: '4月8日 · 周三', lessons: [
    { name: ['声音地图', '与环境录音实践'], time: '14:10–15:45', sections: '7–8', room: '回声室', color: '#9AC5FF' },
    { name: ['光与色彩'], time: '16:10–16:55', sections: '9', room: '光谱室', color: '#FFB379' }
  ] },
  { date: '4月9日 · 周四', lessons: [
    { name: ['微缩景观制作'], time: '09:20–10:05', sections: '2', room: '模型室', color: '#C5AFF5' }
  ] },
  { date: '4月10日 · 周五', lessons: [
    { name: ['云朵观察手记'], time: '11:15–12:00', sections: '4', room: '观云台', color: '#9AC5FF' }
  ] },
  { date: '4月11日 · 周六', lessons: [], note: '今天没有安排课程' },
  { date: '4月12日 · 周日', lessons: [], note: '今天没有安排课程' }
];

function courseCard(dayIndex, lessonIndex, motion) {
  const day = week[dayIndex];
  const lesson = day.lessons[lessonIndex];
  const lines = lesson ? lesson.name : [day.note];
  return {
    motion: motion,
    title: lines[0],
    titleTail: lines[1] || '',
    hasTitleTail: lines.length > 1,
    hasLesson: !!lesson,
    room: lesson ? lesson.room : '',
    time: lesson ? lesson.time : '',
    sections: lesson ? '第' + lesson.sections + '节' : '',
    color: lesson ? lesson.color : ''
  };
}

export default {
  data: {
    dayIndex: 0,
    lessonIndex: 0,
    date: '',
    canSwitch: false,
    courseHint: '',
    cards: [],
    cardOpacity: 1
  },
  onInit() {
    this.queuedSteps = 0;
    this.showRestingCard();
  },
  updateLabels() {
    const day = week[this.dayIndex];
    this.date = day.date;
    this.canSwitch = day.lessons.length > 1;
    this.courseHint = this.canSwitch ? '上下滑动   ' + (this.lessonIndex + 1) + ' / ' + day.lessons.length : '';
  },
  showRestingCard() {
    this.cards = [courseCard(this.dayIndex, this.lessonIndex, '')];
    this.updateLabels();
  },
  changeDay(step) {
    if (this.turnTimer != null) {
      this.queuedSteps += step;
      return;
    }
    this.stopFade();
    const outgoing = courseCard(this.dayIndex, this.lessonIndex, step > 0 ? 'ExitLeft' : 'ExitRight');
    this.dayIndex = (this.dayIndex + step + week.length) % week.length;
    this.lessonIndex = 0;
    const incoming = courseCard(this.dayIndex, 0, step > 0 ? 'EnterRight' : 'EnterLeft');
    this.cards = [outgoing, incoming];
    this.updateLabels();
    // 原生动画持续 280ms，结尾留一帧再回收旧卡片。
    this.turnTimer = setTimeout(() => {
      this.turnTimer = null;
      if (this.queuedSteps) {
        const next = this.queuedSteps > 0 ? 1 : -1;
        this.queuedSteps -= next;
        this.changeDay(next);
      } else {
        this.showRestingCard();
      }
    }, 320);
  },
  previousDay() {
    this.changeDay(-1);
  },
  nextDay() {
    this.changeDay(1);
  },
  swipeLesson(event) {
    if (this.turnTimer != null || !this.canSwitch || (event.direction !== 'up' && event.direction !== 'down')) {
      return;
    }
    const count = week[this.dayIndex].lessons.length;
    const offset = event.direction === 'up' ? 1 : -1;
    this.lessonIndex = (this.lessonIndex + count + offset) % count;
    this.showRestingCard();
    this.stopFade();
    const started = Date.now();
    const draw = () => {
      const remaining = Math.max(0, 1 - (Date.now() - started) / 150);
      this.cardOpacity = 1 - 0.85 * remaining * remaining;
      this.fadeTimer = remaining > 0 ? setTimeout(draw, 25) : null;
    };
    draw();
  },
  stopFade() {
    if (this.fadeTimer != null) {
      clearTimeout(this.fadeTimer);
      this.fadeTimer = null;
    }
    this.cardOpacity = 1;
  },
  stopMotion() {
    this.stopFade();
    this.queuedSteps = 0;
    if (this.turnTimer != null) {
      clearTimeout(this.turnTimer);
      this.turnTimer = null;
      this.showRestingCard();
    }
  },
  onHide() {
    this.stopMotion();
  },
  onDestroy() {
    this.stopMotion();
  }
};
