$(document).ready(() => { 
    $("#rnd_for_txt").html(`Randomize for - ${$("#randomize_for").val()} seconds`); 
    $("#between_txt").html(`Time between randoms - ${$("#between").val()} seconds`);
});

$(document).on("input", "#randomize_for", () => { $("#rnd_for_txt").html(`Randomize for - ${$("#randomize_for").val()} seconds`); });
$(document).on("input", "#between", () => { $("#between_txt").html(`Time between randoms - ${$("#between").val()} seconds`); });

$("#pop_winner").click(function() {
    if(!$(this).hasClass("checked")) $(this).addClass("checked");
    else $(this).removeClass("checked");
})

$("#bt").click(() => {
    let entries = $("#main").children().length;

    if(entries < 2){ show_msg("You need at least 2 entries..."); return; }
    
    let run = true;
    let last = null;
    let flag = false;

    let randomize_for = parseInt($("#randomize_for").val()) * 1000;
    let time_between = parseFloat($("#between").val()) * 1000;
    let pop_winner = $("#pop_winner").hasClass("checked");

    
    if(pop_winner && $("#main").children().length > 2){ $("#main").children().each(function(_, el) { if($(el).hasClass("winner")){ $(this).remove(); } }); }

    $(".winner").removeClass("winner");

    let rnd = () => {
        let rng = Math.floor(Math.random() * entries);
        
        if(run){ setTimeout(() => { rnd(); }, time_between); }
        
        if(!flag){
            setTimeout(() => { run = false; }, randomize_for);
            flag = !flag;
        }
        $(".picking").each(function(_, el) { $(el).removeClass("picking"); });
        last = $($(".square")[rng]).addClass("picking");
    }

    rnd();

    setTimeout(() => { 
        $(".picking").each(function(i, el) { $(el).removeClass("picking"); });
        $($(".square")[Math.floor(Math.random() * entries)]).addClass("winner");
    }, randomize_for + 1000)
});

$("#entrie").keypress(function(e) { if(e.keyCode === 13){ addEntrie(String($("#entrie").val())); } })

let addEntrie = (val) => {
    let stop = false;
    let s = document.createElement("div");
    console.log(parseInt(getComputedStyle(document.documentElement).getPropertyValue("--max")));
    if($("#main").children().length < 49){
        $(s).addClass("square");
        $("#main").append(s);
        
        $(".square").each((_, el) => {
            if($(el).children().length === 0 && !stop){
                let d = document.createElement("div");
                $(d).html(val)
                $(el).append(d);
                stop = !stop;
            }
        });
    
        $("#entrie").val("");
    }
    else{ show_msg("You can't have more entries..."); }
}

$("#add_entrie").click(() => { addEntrie(String($("#entrie").val())); })

$(document).on("click", ".square", function(){ $(this).remove(); })

function show_msg(msg){
    $("#msg").html(msg);
    $("#msg").removeClass("hide");
    setTimeout(() => { $("#msg").addClass("hide"); $("#msg").html(""); }, 2500);
}