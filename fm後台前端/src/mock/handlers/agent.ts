import { http, HttpResponse } from 'msw'
import { MOCK_DATA } from '../../pages/AgentList/AgentList/mock'
import type { DataType } from '../../pages/AgentList/AgentList/types'

export const agentHandlers = [
  /**
   * GET /api/agents
   * - ?level=3
   * - ?parentId=xxx
   */
  http.get('/api/agents', ({ request }) => {
    const url = new URL(request.url)
    const level = url.searchParams.get('level')
    const parentId = url.searchParams.get('parentId')

    let data: DataType[] = []

    if (level) {
      data = MOCK_DATA.filter((a) => a.currentLevel === Number(level))
    } else if (parentId) {
      data = MOCK_DATA.filter((a) => a.parentKey === parentId)
    }

    return HttpResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    )
  }),
]
