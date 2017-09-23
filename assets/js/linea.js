"use strict";

class Reserve {
    constructor(numSeat, row) {
        this.numSeat = numSeat;
        this.row = row;
        this.passengers = [];
        this.currentCell = undefined;
    }

    drawSeat() {
        let col = this.numSeat / this.row;
        let passage = '';
        let table = '';
        table += `<table class="table table-bordered text-center">`;
        for (let i = 1; i <= this.row; i++) {
            table += `<tr>`;
            let group_seat = i;
            for (let j = 0; j < col; j++) {
                table += `<td>${group_seat}</td>`;
                group_seat += 6;
            }

            (i == 3) ? passage += `<td></td>` : passage = '';
            table += `</tr>${passage}`;
        }

        table += `</table>`;
        $('#tablero').append(table);
    }

    showInput() {
        $('#addpass').click(() => {
            $('#passenger').show();
            $('#send').click(() => {
                $('#passenger').hide();
            });
        });

    }
}

let aeroline_reserve = new Reserve(30, 6);
aeroline_reserve.drawSeat();
aeroline_reserve.showInput();