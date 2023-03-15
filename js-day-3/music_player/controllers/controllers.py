# -*- coding: utf-8 -*-
from odoo import http
import json

class MusicPlayer(http.Controller):
    @http.route('/music', auth='public')
    def index(self, **kw):
        return http.request.render('music_player.music_template')

    @http.route('/music/search',auth='public')
    def list(self, **kw):
        # songs = http.request.env['music_player.music_player'].search([])
        # data = json.dumps(songs)
        data = json.dumps({
            'name':'',
        })
        headers = [('Content-Type', 'application/json')]
        return http.request.make_response(data, headers)

    # @http.route('/music_player/music_player/objects/<model("music_player.music_player"):obj>', auth='public')
    # def object(self, obj, **kw):
    #     return http.request.render('music_player.object', {
    #         'object': obj
    #     })
