/**
 * Data stored to superviz meeting stats.
 *
 * @param {Function} set
 * @param {Function} get
 * @return {object} meeting stats.
 */
export default function createSupervizMeetingStats(set, get) {
  return {
    meetingStats: null,
    setMeetingStats: (newMeetingStats) => set(() => {
      return ({meetingStats: newMeetingStats})
    }),
  }
}
